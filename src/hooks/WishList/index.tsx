import { createContext, useContext, useState } from "react";
import { IMovieProps, IWishListContextData, IWishListProviderProps } from "./types";

const WishListContext = createContext({} as IWishListContextData);

export function WishListProvider(props: IWishListProviderProps): JSX.Element {
    const [wishList, setWishList] = useState<IMovieProps[]>(() =>{
        return JSON.parse(localStorage.getItem('wishlist') || '[]');
    });

    function isMovieInWishList(movieId: number): boolean {
        const movieFound = wishList.find((wishListFilm) => wishListFilm.id === movieId);

        return !!movieFound;
    }

    function handleAddOrRemoveMovieOnWishList(movie: IMovieProps) {
        if (isMovieInWishList(movie.id)) {
            const filtredWishList = wishList.filter((wishListFilm) => wishListFilm.id !== movie.id);

            setWishList(filtredWishList);
            
            localStorage.setItem('wishlist', JSON.stringify(filtredWishList));

            return;
        }
        setWishList((prevState) => [...prevState, movie]);
        localStorage.setItem('wishlist', JSON.stringify([...wishList, movie]))
    }

    return(
        <WishListContext.Provider value={{
            wishList,
            setWishList,
            handleAddOrRemoveMovieOnWishList,
            isMovieInWishList
            }}>
            {props.children}
            </WishListContext.Provider>
    )
}

export function useWishList(): IWishListContextData {
    const context = useContext(WishListContext);

// caso o contexto nao exista foi pq n conseguimos recuperar ele através do provider
    if (!context) {
        throw new Error("useWishList must be used with a WishListProvider");
    }

    return context;
}