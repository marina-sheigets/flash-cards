import React from 'react'

export default function Flashcard({flashcard}) {
    const [flip,setFlip]=React.useState(false);
    const [height,setHeight]=React.useState('initial');

    const frontEl=React.useRef();
    const backEl=React.useRef();

    
    function setMaxheight()
    {
           
        if(frontEl.current && backEl.current)
        {
            const frontHeight=frontEl.current.getBoundingClientRect().height;
            const backHeight=backEl.current.getBoundingClientRect().height;
        
            setHeight(Math.max(frontHeight,backHeight,100));
        }
          
    }

    React.useEffect(setMaxheight,[flashcard.question,flashcard.answer,flashcard.options]);
    React.useEffect(()=>{
        window.addEventListener('resize',setMaxheight);
        return ()=>window.removeEventListener('resize',setMaxheight);
    })

  return (
    <div 
        className={`card ${flip ? 'flip':''}` }
        onClick={()=>setFlip(!flip)} 
        style={{height:height}}
    >  


        <div className="front"
        ref={frontEl}
  >
            {flashcard.question}
            <div className="options">
                {flashcard.options.map((elem)=><div key={elem}>{elem}</div>)}
            </div>
        </div>
        <div className="back" ref={backEl} style={{backgroundColor:flashcard.img}}>{flashcard.answer}</div>
    </div>
  )
}

