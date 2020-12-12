
import './FindProducts.sass'


const API_URL = process.env.REACT_APP_API_URL

function FindProducts({results, onDetailProduct }){
debugger
    const handleDetailProduct = (id) => {

        onDetailProduct(id)
    }
   
    return <div className="results">        
        {results.map( ({id, name, description, price }) => 
        <li key={id} className="results__list">
            <p className="results__p">name:{name}</p>            
            <p className="results__p">description: {description}</p>
            <p className="results__p">price: {price}</p>
            <img src={`${API_URL}/products/${id}/images`} width="90px" onClick={() => handleDetailProduct(id)}/>
            
        </li>)}

        
        </div>   

      
}

export default FindProducts