function startWatch() {
	/* check if seconds is equal to 60 and add a +1 to minutes, and set seconds to 0 */
	if (seconds === 60){ 
		seconds = 0; minutes = minutes + 1; 
	} 
	/* you use the javascript tenary operator to format how the minutes should look 
	and add 0 to minutes if less than 10 */ 
	mins = (minutes < 10) ? ('0' + minutes + ': ') : (minutes + ': '); 
	/* check if minutes is equal to 60 and add a +1 to hours set minutes to 0 */
	if ( minutes === 60 ){
		minutes = 0; hours = hours + 1;
	} 
	/* you use the javascript tenary operator to format how the hours should look 
	and add 0 to hours if less than 10 */ 
	gethours = (hours < 10) ? ('0' + hours + ': ') : (hours + ': ');
	secs = (seconds < 10) ? ('0' + seconds) : (seconds); 
	// display the stopwatch 
	var x = document .getElementById("timer");
	x.innerHTML = 'Time: ' + gethours + mins + secs; 
	/* call the seconds counter after displaying the stop watch and increment seconds
	by +1 to keep it counting */ 
	seconds++; 
	/* call the setTimeout( ) to keep the stop watch alive ! */ 
	clearTime = setTimeout("startWatch()", 1000); 
}
startWatch();
//clearTimeout(return ID of setTimeout());