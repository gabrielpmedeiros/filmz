import { IAppProviderProps } from "../interface/AppProvider";
import { GlobalStyles } from "../styles/globals";
import { WishListProvider } from "./WishList";

export function AppProvider(props: IAppProviderProps) {
    return(
        <WishListProvider>
            <GlobalStyles />

            {props.children}
        </WishListProvider>
    );
}