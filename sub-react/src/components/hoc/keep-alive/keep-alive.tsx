import React, {forwardRef, useRef, useState, useMemo, useEffect, useCallback, useImperativeHandle, memo} from 'react'
import type { Ref } from 'react'
import { useOutlet, useLocation, useNavigationType, Outlet } from 'react-router-dom'
import {isArray, isNumber, isObject, isRegExp, isString, throttle} from "lodash";

type ScrollCallback = (event: React.UIEvent<HTMLDivElement>) => void;
type Path = string | RegExp
type InCluedConfig = {
  path: Path;
  cacheOnRouteBack?: boolean
}
export type IncludeItem = Path | InCluedConfig
type PartialPick<T, U> = {
  [K in keyof T]?: K extends keyof U ? T[K] : never;
};

export interface keepAliveActions {
  cacheCurrentRoute: (config?: PartialPick<InCluedConfig, 'path'>) => void;
  cleanCache(key: string): void;
  cleanCache(keys: string): void;
  cleanCache(deleteCount: number): void;
}
const KeepAlive = forwardRef((
{
  max = 10,
  include
}: {
  max?: number
  include?: Path[]
}, ref: Ref<keepAliveActions>) => {
  const outlet = useOutlet();
  const { pathname } = useLocation()
  const action = useNavigationType()
  const cacheKey = useMemo(() => pathname, [pathname]);
  const _include = useRef<IncludeItem[]>(include ?? []);
  const [activeKey, setActiveKey] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const isCacheCurrentRoute = useRef<boolean>(false);
  const componentList = useRef(
      new Map<string, {
        node: React.ReactElement | null,
        timestamp: number;
      }>()
  );
  const scrollStateList = useRef(
      new Map<string, {
        node: HTMLElement;
        left: number;
        top: number;
      }
      >(),
  );
  const [height, setHeight] = useState<string>('100%');

  const _scrollHandle: ScrollCallback = (e) => {
    const target = e.target as HTMLDivElement;
    scrollStateList.current.set(cacheKey, {
      node: target,
      top: target.scrollTop,
      left: target.scrollLeft,
    });
  };

  const _throttledScrollHandle = throttle(_scrollHandle, 300);
  const _cleanCache = useCallback((key: string) => {
    if (componentList.current.has(key)) {
      componentList.current.delete(key)
    }
    if (scrollStateList.current.has(key)) {
      scrollStateList.current.delete(key)
    }
  }, [])

  useImperativeHandle(ref, () => ({
    cacheCurrentRoute: (config) => {
      _include.current.push(config ? {
        ...config,
        path: cacheKey,
      } : cacheKey)
      cacheCurrentRoute()
    },
    cleanCache(param: string | string[] | number) {
      if (isString(param)) {
        _cleanCache(param)
      } else if (isArray(param)) {
        param.forEach(key => {
          _cleanCache(key)
        })
      } else if (isNumber(param)) {
        if (param <= 0 || !Number.isInteger(param)) {
          throw new Error('cleanCache 方法仅接受正整数')
        }
        for (let i = 0; i < param; i++) {
          const oldestKey = Array.from(componentList.current.keys())
            .reduce((a, b) => {
              return componentList.current.get(a)!.timestamp < componentList.current.get(b)!.timestamp ? a : b;
            });
          _cleanCache(oldestKey)
        }
      }
    }
  }));

  const cacheCurrentRoute = useCallback(() => {
    const _judgePath = (path: Path) => {
      if (isString(path)) {
        return path === cacheKey;
      } else if (isRegExp(path)) {
        return path.test(cacheKey);
      }
    }
    const currentRouteConfig = _include.current.find((includeItem) => {
      if (isString(includeItem) || isRegExp(includeItem)) {
        return _judgePath(includeItem)
      } else if (isObject(includeItem)) {
        return _judgePath(includeItem.path);
      }
    })
    isCacheCurrentRoute.current = !!currentRouteConfig
    if (isCacheCurrentRoute.current) {
      if (action === 'POP') {
        if (
          !currentRouteConfig ||
            isRegExp(currentRouteConfig) ||
            !isObject(currentRouteConfig) ||
            !currentRouteConfig.cacheOnRouteBack) {
          _cleanCache(cacheKey)
        }
      } else if (action === 'PUSH') {
        if (componentList.current.size >= max && !componentList.current.has(cacheKey)) {
          const oldestKey = Array.from(componentList.current.keys())
            .reduce((a, b) => {
              return componentList.current.get(a)!.timestamp < componentList.current.get(b)!.timestamp ? a : b;
            });
          _cleanCache(oldestKey)
        }
        componentList.current.set(cacheKey, {
          node: outlet,
          timestamp: new Date().getTime()
        })
      } else if (action === 'REPLACE') {
        _cleanCache(cacheKey)
      }
    }
    setActiveKey(cacheKey)
  }, [cacheKey, action, _cleanCache, max, outlet])

  useEffect(() => {
    cacheCurrentRoute()
  }, [action, cacheCurrentRoute, cacheKey])

  useEffect(() => {
    const element = scrollStateList.current.get(activeKey);
    if (element) {
      requestAnimationFrame(() => {
        element.node.scrollTo({
          top: element.top,
          left: element.left,
        });
      });
    } else {
      containerRef.current?.scrollTo({
        top: 0,
        left: 0,
      });
    }
  }, [activeKey]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (containerRef.current) {
        const newHeight = `calc(100% - ${containerRef.current.offsetTop}px)`
        if (height !== newHeight) {
          setHeight(newHeight);
        }
      }
    })
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    })

    return () => {
      observer.disconnect()
    }
  }, [height, setHeight]);

  return (
    <div
      ref={containerRef}
      onScroll={_throttledScrollHandle}
      style={{
        height: height,
        overflow: 'auto',
      }}>
      {!isCacheCurrentRoute && <Outlet />}
      {Array.from(componentList.current).map(([key, component]) => (
        <div key={key}>
          {key === activeKey ? (
              <div>{component.node}</div>
          ) : (
              <div style={{ display: 'none' }}>{component.node}</div>
          )}
        </div>
      ))}
    </div>
  )
})

export default memo(KeepAlive)