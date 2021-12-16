import { getContext } from "svelte";
import type { History, Location } from "history";
import { match } from "path-to-regexp";

interface Matched<P extends Record<string, string>> {
  params: P;
}

export const useHistory = () => {
  const historyContext: History = getContext("HistoryContext");
  if (!historyContext) {
    throw new Error("エラー");
  }
  return historyContext;
};

export const useLocation = () => {
  const locationContext: Location = getContext("LocationContext");
  if (!locationContext) {
    throw new Error("エラー");
  }
  return locationContext;
};

function matchPath<T extends Record<string, string>>(
  path: string,
  currentPath: string,
  exact: boolean
) {
  // exactは完全一致か判定
  const matcher = match<T>(path, { end: exact });
  //MEMO: => { path: '/user/123', index: 0, params: { id: '123' } } で返却される
  return matcher(currentPath) || null;
}

/** path文字列を渡すと現在のlocationと比較、マッチしているかを判定 */
export function useRouteMath<P extends Record<string, string> = {}>(option: {
  path: string;
  exact: boolean;
}): Matched<P> | null {
  const location = useLocation();
  return matchPath<P>(option.path, location.pathname, option.exact);
}

/** 現在のpathからpath parameters を抽出する */
export function useParams<T extends Record<string, string>>(): T {
  const path: string | undefined = getContext("PathContext");
  if (!path) {
    throw new Error("エラー");
  }
  const matched = useRouteMath<T>({ path, exact: false });
  if (!matched) throw new Error("エラー");
  return matched.params;
}
