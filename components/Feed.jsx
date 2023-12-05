'use client'

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ posts, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = ({ data, handleTagClick }) => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  // const fetchPosts = async () => {
  //   const response = await fetch("/api/prompt");
  //   const data = await response.json();

  //   setAllPosts(data);
  // };

  useEffect(() => {
    ;(async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    })()
  }, [])

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList posts={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed
