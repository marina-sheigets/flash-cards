import React, { useEffect } from "react";
import FlashcardList from "./FlashcardList";
import "./assets/app.css"
import axios from "axios";

function App() {
  const [flashcards,setFlashcards]=React.useState([]);
  const [categories,setCategories]=React.useState([]);

  const  categoryEl=React.useRef();
  const  amount=React.useRef();


  useEffect(()=>{
    axios
     .get("https://opentdb.com/api_category.php")
     .then(res=>{
        setCategories(res.data.trivia_categories);
     })
      .catch((error)=>console.log( error));
  });
     
     

  function decodeString(str)
  {
    const textArea=document.createElement('textarea');
    textArea.innerHTML=str;
    return textArea.value;
  }

  function handleSubmit(e)
  {
    e.preventDefault();
    axios
    .get(`https://opentdb.com/api.php?`,{
      params:{
        amount:amount.current.value,
        category:categoryEl.current.value
      }
    })
    .then(res=>{
      setFlashcards(
      res.data.results.map((questionItem,index)=>{
        const answer=decodeString(questionItem.correct_answer) ;
        const options=[...questionItem.incorrect_answers.map(str=>decodeString(str)),answer];
        return{
          id:`${index}-${Date.now()}`,
          question:decodeString(questionItem.question),
          answer:questionItem.correct_answer,
          options:options.sort(()=>Math.random()-0.5)
        }
      }))
      })
      .catch((error)=>{
        console.log(error);
      })

  }

  return ( 
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category" >Category</label>
          <select ref={categoryEl} id="category">
              {categories.map(category=>{
                return <option value={category.id} id={category.id}>{category.name}</option>
              })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number Of Questions</label>
          <input type="number" id="amount" min="1" step="1" defaultValue="10" ref={amount} />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
              <FlashcardList flashcards={flashcards}/>
      </div>
    </>
  );
}


export default App;
