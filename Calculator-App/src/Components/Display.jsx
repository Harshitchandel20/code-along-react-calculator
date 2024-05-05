const Display = (props) => {
    const{inputs,result}=props
    
    console.log(inputs,result)

  return (
    <div className='values'>
        {result ? result:inputs}
      
    </div>
  )
}

export default Display
