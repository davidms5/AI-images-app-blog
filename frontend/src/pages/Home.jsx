import React, {useState, useEffect} from 'react'
import { Card, FormField, Loader } from '../components'

const RenderCards = ({ data, title}) =>{
  if(data?.length > 0){
     return data.map((post) => <Card key={post._id} {...post}/>)
   
  }

  return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
  )
}


function Home() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] =useState('');

  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null)
  useEffect(() =>{
    const fetchPosts = async () =>{
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8000/api/v1/post', {
          method:'GET',
          headers: {
            'Content-type': 'application/json',
          },
        })
        if(response.ok){
          const result = await response.json();

          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error)
      } finally{
        setLoading(false)
      }
    } 

    fetchPosts();
  }, [])


  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    clearTimeout(searchTimeout);

    setSearchTimeout(
      setTimeout(() =>{
        const searchResults = allPosts.filter((item) => item.name.
        toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase()
        .includes(searchText.toLowerCase()));

        setSearchedResults(searchResults)
      }, 600)
    );
  }
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>el showcase de la comunidad</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>navega a traves de una coleccion de imsginativas y visualmente
        increibles imagenes generadas por DALL-E AI </p>
      </div>

      <div className='mt-16'>
        <FormField
        LabeLName="search posts"
        type="text"
        name='text'
        placeholder="search posts"
        value={searchText}
        handleChange={handleSearchChange}/>
      </div>

      <div className='mt-10 '>
        {loading ? (
          <div className='flex justify-center items-center'>
              <Loader/>
          </div>
        ): (
        <>{searchText && (
            <h2 className='font-medium text-[#666e75] text-xl mb-3'>
              mostrando resultados para <span className='text-[#222328]'>{searchText}</span>
               </h2>
        )}

        <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
            {searchText ? (
                <RenderCards data={searchedResults} title='no searched results found'/>
            ) : (
              <RenderCards data={allPosts} title='no posts found'/>
            )}

        </div>
        </>
        )}
      </div>
    </section>
  )
}

export default Home