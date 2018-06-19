/*
* Question:
* const team = {
*   members: ['Superman', 'Batman', 'Wonder Woman'],
*   teamName: 'Justice league',
*   teamSummary: function () {
*     return this.members.map(function (member) {
*       return `${member} is on team ${this.teamName}`;
*     });
*
*   }
* };
*
* team.teamSummary();
*
* i) Will the above code block return an error?
* ii) If yes, then why and how do we fix it?
*/

/*
* Answers:
* i. The above code block will return an error.
*
* ii. The above codeblock will return an error because the callback function
* in the map method iterating over the members is a new function. And every
* new function in the javascript world, is placed in a new execution context
* of the execution stack. Therefore, the 'this' would point to the global window
* object in the browser, or simply undefined in any other environment.
*
* We can solve the problem by using the arrow function in place of a new
* anonymous function because it lexically binds the context to the parent object
* and hence the 'this' keyword refers to it.
*
* The following is how we can fix it:
* */

const team = {
  members: ["Superman", "Batman", "Wonder Woman"],
  teamName: "Justice league",
  teamSummary: function() {
    return this.members.map(member => {
      return `${member} is on team ${this.teamName}`;
    });
  }
};

export default team.teamSummary();
