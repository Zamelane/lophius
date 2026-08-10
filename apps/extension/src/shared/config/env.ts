import { Mode } from "../types";

export const API_URL = import.meta.env.VITE_API_URL || 'localhost:3000';

export const MODE = import.meta.env.VITE_MODE

export const IS_DEV = MODE === Mode.DEV