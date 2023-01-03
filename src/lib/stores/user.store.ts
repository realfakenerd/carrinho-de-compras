import { userStore } from 'sveltefire';
import { auth } from '../firebase';

const user = userStore(auth);
export default user;
