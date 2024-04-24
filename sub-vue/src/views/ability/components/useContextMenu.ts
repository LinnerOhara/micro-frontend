import {Ref, ref, onMounted, onUnmounted} from 'vue'

export default function useContextMenu(containerRef: Ref<HTMLElement | null>) {
  const showMenu = ref(false);
  const x = ref(0);
  const y = ref(0);

  const hideMenu = () => {
    showMenu.value = false;
  };

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault(); // 阻止默认的右键菜单
    if (containerRef.value) {
      const rect = containerRef.value.getBoundingClientRect();
      x.value = event.clientX - rect.left;
      y.value = event.clientY - rect.top;
      showMenu.value = true;
    }
  }

  const clickOutside = (event: MouseEvent) => {
    if (showMenu.value && !containerRef.value?.contains(event.target as Node)) {
      hideMenu();
    }
  };

  onMounted(() => {
    document.addEventListener('mousedown', clickOutside);
    if (containerRef.value) {
      containerRef.value.addEventListener('mousedown', handleContextMenu);
    }
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', clickOutside);
    if (containerRef.value) {
      containerRef.value.removeEventListener('contextmenu', handleContextMenu);
    }
  });


  return {
    x, y, showMenu
  }
}