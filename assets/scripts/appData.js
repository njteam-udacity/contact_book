(function () {

    var storageKey = "contactList";

    /**
     * Uses webstorage to store an array of contacts.
     * @param {object[]} contacts 
     * @param {function} callback takes two parameters `(error: Error|null, data?: object[])
     * it is a good idea to first test for validity of the error to handle that error.
     * 
     * @example ```
     * dataStore.setData(
     *     [
     *         {
     *              name: "Test McTesting", 
     *              email: "testing@abc123.com", 
     *              avatar: "/images/test.png", 
     *              id: "00000000001"
     *         }
     *     ],
     *     function(error) {
     *     
     *         // if there was an error
     *         if (error) {
     *             // deal with the error
     *             console.error(error);
     *             // and exit
     *             return;
     *         }
     * 
     *         // otherwise everthing went well, yay :)
     *         console.log(contact saved!);
     * 
     *     }
     * );
     * ```
     */
    function setData(contacts, callback) {

        if (!Array.isArray(contacts)) {
            callback(new Error("Data must be an array"));
            return;
        }

        try {
            window.localStorage.setItem(storageKey, JSON.stringify(contacts));
            callback(/*There is no error to pass here*/null);
        } catch (error) {
            callback(error);
        }
        
    }

    /**
     * Gets the data array previously stored by the call to `setData`.
     * Accepts a function as a callback that can return the array. 
     * If no array was previously set then an empty array will be returned.
     * @param {function} callback  takes two parameters `(error: Error|null, data?: object[])`
     * it is a good idea to first test for validity of the error to handle that error.
     * 
     * @example ```
     * dataStore.getData(function(error, data) {
     *     
     *     // if there was an error
     *     if (error) {
     *         // deal with the error
     *         console.error(error);
     *         // and exit
     *         return;
     *     }
     * 
     *     // otherwise everthing went well
     * 
     *     // so we can use the data
     *     
     *     if (data.length === 0) {
     *         console.log('There are no contacts yet!');
     *         // exit
     *         return;
     *     }
     * 
     *     for (var i = 0; i < data.length; i++) {
     *         var contact = data[i];
     *         console.log(contact.name);
     *     }
     * 
     * });
     * ```
     */
    function getData(callback) {

        try {

            var raw = window.localStorage.getItem(storageKey);
            var data;

            if (raw) {
                data = JSON.parse(raw);
            }
            else {
                data = [];
            }
    
            callback(/*There is no error to pass here*/null, data);

        } catch (error) {
            callback(error);          
        }
        
    }

    window.dataStore = {
        setData: setData,
        getData: getData
    };

})();