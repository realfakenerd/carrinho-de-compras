import {auth} from "../firebase";
import { authState } from 'rxfire/auth';

const user = authState(auth);
export default user;
