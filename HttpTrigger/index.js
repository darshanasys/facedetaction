var request = require('request');
var util = require('util');
const postRequest = util.promisify(request.post);


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.'); 
    var result = await analyzeImage();
    
    context.res = {
        body: {
            result
        }
    };
    console.log(result); 
    context.done();  
};

 async function analyzeImage(){
    let jsonResponse;

    const subscriptionKey='92c231de55fc4da386173681266a7d01'; 
    const uriBase='https://faceapikey.cognitiveservices.azure.com/face/v1.0/detect'; 
    const imageUrl='http://i.huffpost.com/gen/2500992/images/o-CRICKET-TEAM-INDIA-facebook.jpg'; 
    // const params = {​​​​​​
    //     'returnFaceId':'true', 
    //     'returnFaceLandmarks':'false', 
    //     'returnFaceAttributes':'age,gender,emotion'
    // }​​​​​​; 
    // const options = {​​​​​​
    //     uri:uriBase,
    //     qs:params,
    //     body:'{​​​​​​"url":'+'"'+imageUrl+'"}​​​​​​',
    //     headers:{​​​​​​
    //         'Content-Type':'application/json',
    //         'Ocp-Apim-Subscription-Key':subscriptionKey
    //     }​​​​​​
    // }​​​​​​;

    try {
        response = await postRequest({
            uri:uriBase,
            qs:{'returnFaceId':'true', 'returnFaceAttributes':'age,gender,emotion'},
            body:'{​​​​​​"url":'+'"'+imageUrl+'"}​​​​​​',
            headers:{​​​​​​'Content-Type':'application/json','Ocp-Apim-Subscription-Key':subscriptionKey }
        });
    } catch (error) {
        // Any exceptions raised while processing error do not need to be handled like we had to when returning a new Promise. The exception will be properly caught by Azure Functions
        context.log(error.toString());
        // Re-throwing this because Azure functions automatically catches this exception and will mark your execution as "failed"
        throw error;
    }


    // await postRequest(options, (error, response, body) => {
    //     if (error){
    //         console.log('Error: ' + error);
    //         return;
    //     }

    //     jsonResponse = JSON.parse(body);   
    // });
    // return jsonResponse;

}

//module.exports = async function (context) {
//     const subscriptionKey='92c231de55fc4da386173681266a7d01'; 
//     const uriBase='https://faceapikey.cognitiveservices.azure.com/face/v1.0/detect'; 
//     const imageUrl='http://i.huffpost.com/gen/2500992/images/o-CRICKET-TEAM-INDIA-facebook.jpg'; 
//     const params = {​​​​​​
//         'returnFaceId':'true', 
//         'returnFaceLandmarks':'false', 
//         'returnFaceAttributes':'age,gender,emotion'
//     }​​​​​​; 
//     const options = {​​​​​​
//         uri:uriBase,
//         qs:params,
//         body:'{​​​​​​"url":'+'"'+imageUrl+'"}​​​​​​',
//         headers:{​​​​​​
//             'Content-Type':'application/json',
//             'Ocp-Apim-Subscription-Key':subscriptionKey
//         }​​​​​​
//     }​​​​​​; 
//     request.post(options,(error,response,body)=>{​​​​​​
//         if(error){​​​​​​
//                 context.log('Error:',error);
//             return;
//         }​​​​​​

//         let jsonResponse=JSON.stringify(JSON.parse(body),null,' ');
//         context.res = {
//             status: 200,
//             body: jsonResponse
//         };
//         context.log('JSON Response\n');
//         context.log(jsonResponse);
//     }​​​​​​);

//     context.log('JavaScript HTTP trigger function processed a request.');

//     // const name = (req.query.name || (req.body && req.body.name));
//     // const responseMessage = name
//     //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//     //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//     // context.res = {
//     //     // status: 200, /* Defaults to 200 */
//     //     body: responseMessage
//     // };
// }

// async function analyzeImage(byteArray){

//     const subscriptionKey='92c231de55fc4da386173681266a7d01'; 
//     const uriBase='https://faceapikey.cognitiveservices.azure.com/face/v1.0/detect'; 
//     const imageUrl='http://i.huffpost.com/gen/2500992/images/o-CRICKET-TEAM-INDIA-facebook.jpg'; 
//     const params = {​​​​​​
//         'returnFaceId':'true', 
//         'returnFaceLandmarks':'false', 
//         'returnFaceAttributes':'age,gender,emotion'
//     }​​​​​​; 
//     const options = {​​​​​​
//         uri:uriBase,
//         qs:params,
//         body:'{​​​​​​"url":'+'"'+imageUrl+'"}​​​​​​',
//         headers:{​​​​​​
//             'Content-Type':'application/json',
//             'Ocp-Apim-Subscription-Key':subscriptionKey
//         }​​​​​​
//     }​​​​​​; 
//     let jsonResponse;

//     await request.post(options, (error, response, body) => {
//         if (error){
//             console.log('Error: ' + error);
//             return;
//         }

//         jsonResponse = JSON.parse(body);   
//     });
//     return jsonResponse;

//}