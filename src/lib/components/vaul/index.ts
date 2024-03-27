import { Drawer as DrawerPrimitive, type DrawerDirection } from 'vaul-svelte';
import DrawerContent from './content.svelte';
import { writable } from 'svelte/store';

const Drawer = DrawerPrimitive.Root;
const DrawerTitle = DrawerPrimitive.Title;
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerClose = DrawerPrimitive.Close;

export const drawerState = writable(false);

export {
	//
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTitle,
	DrawerTrigger,
	type DrawerDirection
};
