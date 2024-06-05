
# 1 - Syntax and Scope error domino
- **Context** : Continuously looping POST requests with `{name: "", number: ""}` in `React` Frontend development mode
- **Reason** : 
	- Syntax error with form button type
	- Scope issues with POST request handler method
- **SOLUTION** :
	- Change syntax from `<button type='submit'>` to `<button type="submit">`
	- Setup function closure, collect information from form, manage validation and update, push data to backend

<br>
<hr>

# 2 - Forgetting `throw` error
- **Context** : Name, number validation test crashes frontend with '`Unhandled Promise Rejection`' error
- **Reason** : 
	- Forgot to `throw error;` in `phonebook.js` client-API methods
	- STUCK DEBUGGING ON THE WRONG END
	  - Frontend validation error of input, at POST request handler
	  - Probably MASKED Problem ( *setting `State` variable to an empty '`[]`' instead of '`null`'* ) with `originalContacts` state variable
	
- **SOLUTION** :	
	- WRONG END - { probably, apply FSopen -part2-remarks-solution }
	- Check `errorHandler`, and ask yourself - " *Why is the error not 'throwing up' !?* "


<br>
<hr>

# 3 - Lint config
- **Context** : 
	- Installed `ESLint ^9.2.0`
	- Generates ONLY an ESmodule file (eslint.config.mjs) even though explicitly mentioned for CommonJS module.
- **Reason** :
	- Probably Part 3d-'Lint' is outdated and needs an update.


<br>
<hr>

