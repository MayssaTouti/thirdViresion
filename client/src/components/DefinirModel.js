import React  from "react" ;
import ReactToPrint from 'react-to-print';
import {render } from "react-dom" ;
 

const  DefinirModel =()=> {
class ComponentToPrint extends React.Component {
    render() {
      return (
        <table>
          <thead>
            <th>column 1</th>
            <th>column 2</th>
            <th>column 3</th>
          </thead>
          <tbody>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
              <td>data 3</td>
            </tr>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
              <td>data 3</td>
            </tr>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
              <td>data 3</td>
            </tr>
          </tbody>
        </table>
      );
    }
  }
   
  class Example extends React.PureComponent {
    render() {
      return (
        <div>
          <ReactToPrint
            trigger={() => {
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              return <a href="#">Print this out!</a>;
            }}
            content={() => this.componentRef}
          />
          <ComponentToPrint ref={el => (this.componentRef = el)} />
        </div>
      );
    }
  }

render(<Example/> ,document.querySelector("#root"));

}
export default DefinirModel ;