


//standard way of making a custom hoook

import { useState } from "react";

export function useFilter(data,callback) {
    const [query,setQuery] = useState('');
   const filteredData  = data.filter((item)=>{return callback(item).includes(query)});
   return [filteredData , setQuery]        
}
