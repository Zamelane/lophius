'use client';

import { SWRConfig } from 'swr'
import {LayoutProps} from "@/interfaces";

export const SWRProvider = ({ children }: LayoutProps) => {
	return <SWRConfig>{children}</SWRConfig>
};