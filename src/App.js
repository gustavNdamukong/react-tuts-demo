import React, { Fragment, useState, useEffect, useRef } from 'react';
import './App.css';
import Input from './Input';

function App(props) {
    /*
    NOTES: useState() can be passed any value which it will in turn pass to setIsTrue().
      setIsTrue (u can call it anything) is auto treated as a setter func for the value 
      of isTrue (u can also call it anything).
      Even in your own custom funcs (eg toggleTrue() below), u can call setIsTrue() & 
      pass is values to set on isTrue.
      isTrue is therefore a state var for dynamically changing values in your app.
      That's how state works. It is all made possible with the built-in useState from react.    
    */
    const [isTrue, setIsTrue] = useState(true)
    const [crowd, setCrowd] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dob, setDob] = useState("")

    //refs
    const firstNameRef = useRef();
    const lastNameRef = useRef(null);
    const dobRef = useRef(null);

    const toggleTrue = () => {
        if (isTrue) {
            setIsTrue(false);
            return
        }
        setIsTrue(true);
        return 
    }

    // A hook is a function (custom or built-in) in react that pulls information from 
    // outside your application whether from a DB, external func or an API into your app,
    // then calls one of your useEffect setter funcs to persist that data.
    // useEffect() is a built-in hook. 
    useEffect(() => {
      console.log("useEffect fired")

      // This people data can be coming from a DB or an API call
      let people = [
        {
          id: 1,
          firstName: "Mary",
          lastName: "Jones",
          dob: "1997-05-02"
        },
        {
          id: 2,
          firstName: "Jack",
          lastName: "Smith",
          dob: "1999-02-04"
        }
      ]

      // calling the setCrowd() func created with useState will ensure the data is persisted 
      // across page refreshes. 
      setCrowd(people)

    }, []);


    const handleSubmit = (event) => {
      // in react, this is the only way to prevent a form submission
      // by default-& it must be the first thing in this function.
      event.preventDefault();

      if (lastName !== "") {
        console.log("About to add a person! "+ firstName+' '+lastName+' '+dob);
        addPerson(firstName, lastName, dob);
      }
    }

    const addPerson = (newFirst, newLast, newDOB) => {
      // create object
      let newPerson = {
        id: crowd.length + 1,
        firstName: newFirst,
        lastName: newLast,
        dob: newDOB,
      }

      const newList = crowd.concat(newPerson);

      const sorted = newList.sort((a, b) => {
        if (a.lastName < b.lastName) {
          return -1; // reverse the order of the list
        } else if (a.lastName > b.lastName) {
          return 1;
        }
        return 0; // do nothing
      });

      setCrowd(sorted);
      setFirstName("");
      setLastName("");
      setDob("");

      firstNameRef.current.value = "";
      lastNameRef.current.value = "";
      dobRef.current.value = "";
    }

    return (
        <Fragment>
            <hr />
            <h1 className="h1-green">{props.msg}</h1>
            <hr />
            {
                isTrue && 
                <Fragment>
                    <p>The current value of isTrue is true</p>
                </Fragment>
            }
            <hr />
            {
                isTrue ? <p>Is true</p> : <p>Is false</p>
            }
            <hr />
            <a href="#!" className="btn btn-outline-second" onClick={toggleTrue}>Toggle is true</a>
            <hr />

            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label className='form-label' htmlFor='first-name'>First Name</label>
                <input 
                  type="text"
                  name="first-name"
                  id="first-name"
                  ref={firstNameRef}
                  autoComplete="first-name-new"
                  className='form-control'
                  onChange={(event) => setFirstName(event.target.value)}
                ></input>
              </div>

              <Input
                title="Last Name"
                type="text"
                ref={lastNameRef}
                name="last-name"
                autoComplete="last-name-new"
                className="form-control"
                onChange={(event) => setLastName(event.target.value)}
              ></Input>

              <Input
                title="Date of birth"
                type="date"
                ref={dobRef}
                name="dob"
                autoComplete="dob-new"
                className="form-control"
                onChange={(event) => setDob(event.target.value)}
              ></Input>

              <input type="submit" value="Submit" className="btn btn-primary"></input>

            </form>

            <div>
              First Name: {firstName}<br />
              Last Name: {lastName}<br />
              DOB: {dob}<br />
            </div>

            <hr />
            <h3>People</h3>
            <ul className="list-group">
              {crowd.map((m) => (
                <li key={m.id} className="list-group-item">{m.firstName} {m.lastName}</li>
              ))}
            </ul>
        </Fragment>
    )
}

export default App;