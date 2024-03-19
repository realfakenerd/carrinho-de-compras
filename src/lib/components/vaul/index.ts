import { Drawer as DrawerPrimitive, type DrawerDirection } from 'vaul-svelte';
import DrawerContent from './content.svelte';

const Drawer = DrawerPrimitive.Root;
const DrawerTitle = DrawerPrimitive.Title;
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerClose = DrawerPrimitive.Close as DrawerPrimitive.Close;

export {
	//
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTitle,
	DrawerTrigger,
	type DrawerDirection
};
