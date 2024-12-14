

const dataTR = require('../locales/tr.json');

 // object



function MyComponent(world) {
  try {
    return dataTR[world]
    
  
  } catch (error) {
    return world
  }
  
}

export default MyComponent;
