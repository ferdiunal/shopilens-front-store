/**
 * Redux Hooks
 * Type-safe useSelector ve useDispatch
 */

import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./index";

/**
 * Type-safe useDispatch hook
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Type-safe useSelector hook
 */
export const useAppSelector = useSelector.withTypes<RootState>();

/**
 * Type-safe useStore hook
 */
export const useAppStore = useStore.withTypes<AppStore>();
