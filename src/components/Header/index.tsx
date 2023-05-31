import { FaBars, FaHome, FaRegUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import Logo from "../../assets/logo.png"
import * as Styles from "./styles"
import { Button } from "../Button"
import { Link } from "../Link"
import { ButtonVariants } from "../Button/types"
import { useState, FormEvent } from 'react'
import { useWishList } from "../../hooks/WishList"


export function Header() {

  const navigate = useNavigate()

  const [search, setSearch] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (search) {
      navigate(`/search?keyword=${search}`)
    }
  }

  const { wishList, handleAddOrRemoveMovieOnWishList, isMovieInWishList } =
   useWishList();

  return (
    <Styles.Container>
      <div>
          <Link to="/">
          <img
            src={Logo}
            alt="Logo de Filmz. Botão de play ao lado do texto 'Filmz'"
          />
          </Link>
          
          <Link to="/">
              <FaHome />
                Home
          </Link>


          <Link to="/wishlist">
              <FaBars />
                Minha lista ({wishList.length})
          </Link>
      </div>

      <Button
      type="button"
      variant={ButtonVariants.Tertiary}
      onClick={() => navigate("/login")}>
        <FaRegUser />
      </Button>

      <form className="search-wrapper" onSubmit={handleSubmit}>
        <input
          style={{borderRadius: '8px 0px 0px 8px'}}
          type="text"
          placeholder="Pesquise um filme"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Button style={{borderRadius: '0px 8px 8px 0'}} type="submit">Pesquisar</Button>
      </form>
    </Styles.Container>
  )
}
