import { createContext } from "react";
import StorageService from "../storage/StorageService";

const authContext = createContext({
  username: "",
  setUsername: (username: any) => {}
});

export default authContext;