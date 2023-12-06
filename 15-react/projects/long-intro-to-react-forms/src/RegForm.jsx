//.src/RegForm
import { useState, useEffect } from 'react'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'

export default function RegForm() {
  // setting fields:
  // making a lot of investigations. Better not use object here (reason is, its components not updating an object from point of useStste, so no rerender controlled field)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneType, setPhoneType] = useState('');
  const [staff, setStaff] = useState('');
  const [bio, setBio] = useState('');
  const [isSigned, setIsSigned] = useState(false);

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // setting submit function
  const onSubmit = (e) => {
    e.preventDefault()
    setHasSubmitted(true); // only from button at least once
    if (validationErrors.length > 0) {
      // console.log(`Errors found: ${validationErrors.length}, no submitting to server `);
      // return uncomment after debug
    }

    // compose to object
    const userInformation = {
      name,
      email,
      phoneNumber,
      phoneType,
      staff,
      bio,
      isSigned,
      submittedOn: new Date()
    };
    if (validationErrors.length > 0) {
      console.log(`Errors found: ${validationErrors.length}, no submitting to server `);
      console.log(`data for debug: ${JSON.stringify(userInformation)}`);
      return 
    }
   
    // resetting form values
    setName('');
    setEmail('');
    setPhoneNumber('');
    setPhoneType('');
    setStaff('');
    setBio('');
    setIsSigned(false);
    
    //sendin to 'server'
    console.log(`submitted ${JSON.stringify(userInformation)}`);
    setHasSubmitted(false);

  }


  // making dynamic validation on every field after first submit:
  useEffect(() => {
    console.log('---Validating:')
    const errors = []
    if (!name) errors.push('Name must be present ')

    //Email must be present and should be properly formatted
    if (!isEmail(email)) errors.push('Email must be valid ')
    
    //Phone number should be properly formatted
    if (phoneNumber && !isMobilePhone(phoneNumber)) errors.push('Phone number must be valid ')

    if (phoneNumber && !phoneType) errors.push('Phone type should be selected if a phone number is present ')
    if (bio.length > 280) errors.push(`Bio should have a character limit of 280 characters. Currently: ${bio.length}`)


    
      console.log('errors found:', errors.length);
    
      setValidationErrors(errors)
    

  }, [name, email, phoneNumber, phoneType, staff, bio, isSigned])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>User Registration Form on React</legend>
          <br />
          <div>
            <label htmlFor='name' >Name: </label>
            <input type='text' id='name' value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <br />

          <div>
            <label htmlFor='email' >Email: &nbsp;</label>
            <input type='text' id='email' value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <br />

          <div>
            <label htmlFor='phoneNumber' >Phone: </label>
            <input type='text' id='phoneNumber' value={phoneNumber}
              placeHolder='+38099123456789'
              onChange={e => {
                setPhoneNumber(e.target.value)
                if (phoneNumber.length===0) setPhoneType('')
              }}
            />
            &nbsp;

            <label htmlFor='phoneType' >type: </label>

            <select disabled={phoneNumber.length === 0} name='phoneType' id='phoneType'
              onChange={e => setPhoneType(e.target.value)}
              value={phoneType}
            >
              <option value='' disabled>Select a phone type... </option>
              <option>Home</option>
              <option>Work</option>
              <option>Mobile</option>
            </select>
          </div>
          <br />

          <div>
            <label htmlFor='bio' >Biogra: </label>
            <textarea id='bio' value={bio} rows={4} cols={50}

              onChange={e => setBio(e.target.value)}
            />
          </div>
          <br />

          <div> Staff: &nbsp;
            <input type='radio' id='staff' name='staff' value={staff}
              onChange={e => e.target.checked ? setStaff('Student') : null}
            />
            <label htmlFor='student' >Student &nbsp;&nbsp;</label>

            <input type='radio' id='Instructor' name='staff' value={staff}
              onChange={e => e.target.checked ? setStaff('Instructor') : null}
            />
            <label htmlFor='instructor' >Instructor</label>

          </div>
          <br />

          <div>
            <label htmlFor='isSigned' >Sign up for email notifications: &nbsp;</label>
            <input type='checkbox' id='isSigned' value={isSigned}
              onChange={e => setIsSigned(!isSigned)}
            />
          </div>
          <br />


          <button>Submit</button>
          <br />
          <div>
          {hasSubmitted && validationErrors.length > 0 && (
          <div>
            The following errors were found:
            <ul>
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
          </div>
        </fieldset>
      </form>



    </div>
  );
}
