import React, { useState } from 'react';
// import { useEffect } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
 
const Test = (props) => {
    const mostrarBoton = props.mostrarBoton;
    //Recivo el fondo del input, dependiedno si es valido o no
  const [address, setAddress] = useState("");
  const [backgroundInput, setBackgroundInput] = useState({backgroundColor: ""});
  const [todoOk, setTodoOk] = useState(false);

  const handleChange = (e) => {
    let address = e;
    if(todoOk){
        setBackgroundInput({backgroundColor: ""})
        address = "";
        mostrarBoton(address, false);
        setTodoOk(false)
    }
    setAddress(address)
  };
 
  const handleSelect = e => {
    let address = e;
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.log('Error', error));
      setAddress(address);
    setBackgroundInput({backgroundColor: "#7AFC71"})

    mostrarBoton(address, true); //Le avisa al padre que ya puede enviar el formulario
    setTodoOk(true);
  };

//   useEffect(()=>{
//     console.log(address);
//     if(address !== ""){
//         // mostrarBoton(direccion, mostrar(true) o ocultar el boton(false))
//         mostrarBoton(address, true);
//     }
//     else{
//         mostrarBoton(address, false);
//     }
//   },[address]);

    return (
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
            style={backgroundInput}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input form-control'
                
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
}
export default Test;
