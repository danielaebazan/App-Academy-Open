Some of them are done, some thinked of.

Bonus
Once your form is working, here are some stretch goals:

Store the time of submission as another key-value pair in the JSON object you console.log
Hint: Use Date
-done


Disable the phoneType dropdown menu if the Phone field is empty
- done


Add a placeholder to show the proper format for inputting a phone number
-done

On submit, make sure the phoneType is blank in your JSON object if no phone is given (even if there is a phoneType selected)
-done


Highlight fields that fail validation in red
- add different variable to every field className.
- set it to 'red' with creating err message

- probably with next task better create separate error vars and messages for each field


Associate each error message with its field on the form instead of printing them all at the top
- make separate messages and vars
- look for space

Render errors without shifting the form fields up or down
Hint: Reserve space for the error messages even when they are not present
- already in previous

After a user has submitted a form with errors, validate the updates on keystroke instead of waiting for submit so the errors clear as soon as they are fixed
- done


If you have accomplished all of the above, your Form component has likely grown quite large. It also probably has some repeated lines of code. Remember that shorter, more modular code that does not repeat itself is easier to understand and maintain. With that in mind, refactor your code to clean up your Form component! In particular, look to see if any code blocks could be refactored into their own React components.
Suggestion: Consider rendering each input type (text, select, textarea, radio, checkbox) as a React component. To help keep your code manageable and modularized, define each new component in its own file.

-probably yes, create separate components

Try adding the validations to their respective input components. (You will need to create separate validation functions for each field.)
- yes

Add CSS styling
- can be done...

Congratulations! You now know how to build and use a basic form in React!