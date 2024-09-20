import toast, { Toaster } from 'react-hot-toast';
import css from "./SearchBar.module.css"

export default function SearchBar( {onSearch} ) {
    return (
        <header className={css.header}>
  <form onSubmit={(event) => {
    event.preventDefault()
    const form = event.target
    const query = form.elements.query.value
    if(form.elements.query.value.trim() === "") {
			toast('Введіть текст для пошуку!');
			return;
		}
    onSearch(query)
    form.reset()
  }}>
    <input
      name="query"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      className={css.input}
    />
    <button type="submit">Search</button>
  </form>
  <Toaster />
</header>

    )
}