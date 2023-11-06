
let takeApiData;

const loadFeatures = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        const res = await fetch(url);
        const data = await res.json();
        takeApiData = data.data.tools;
        displayFeatures(data.data.tools);

    }
    catch (error) {
        console.log(error);
    }
}


const displayFeatures = (features) => {

    // console.log(features);

    const featureContainer = document.getElementById('feature-container');
    featureContainer.innerText = '';
    const btnContainer = document.getElementById('btn-container');

    if (features.length > 6) {
        features = features.slice(0, 6);
        btnContainer.classList.remove('d-none');
    }


    showDataALL(features);

}


const showDataALL = (allData) => {

    const featureContainer = document.getElementById('feature-container');
    featureContainer.innerText = '';
    const btnContainer = document.getElementById('btn-container');
    if(allData.length > 6 ){
        btnContainer.classList.add('d-none');
    }

    allData.forEach(feature => {

        // console.log(feature.id);

        const featureDiv = document.createElement('div');
        featureDiv.classList.add('col');
        featureDiv.innerHTML = `
        
        <div class="card h-100">
            <img class="p-3 rounded" src="${feature.image ? feature.image : 'Image is not Found'}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title">Features</h3>
                <ol>
                    <li>${feature.features ? feature.features[0] : "No Feature Found"}</li> 
                    <li>${feature.features ? feature.features[1] : "No Feature Found"}</li> 
                    <li>${feature.features ? feature.features[2] : "No Feature Found"}</li> 
                </ol>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <div>
                <h3>${feature.name ? feature.name : "Name is not Found"}</h3>
                <p><i class="fa-solid fa-calendar-days text-danger me-2"></i> ${feature.published_in ? feature.published_in : "Published Date is not Found"}</p>
                </div>
                <span onclick="loadModalBody('${feature.id ? feature.id : "Id is not found"}')" class=" text-info fs-3" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-circle-arrow-right"></i></span>

            </div>
        </div>
        
        `;
        featureContainer.appendChild(featureDiv);
    });
    spinner(false);
}

const spinner = isLoading => {
    const spinnerContainer = document.getElementById('spinner-container');
    if (isLoading === true) {
        spinnerContainer.classList.remove('d-flex');
    }
    else {
        spinnerContainer.classList.add('d-flex');
    }
}


document.getElementById('btn-see-more').addEventListener('click', function () {
    spinner(true);
     showDataALL(takeApiData);

})

const loadModalBody = async (id) => {
    // console.log(id);
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        showModalBody(data.data);
    }
    catch (error) {
        console.log(error);
    }

}

const showModalBody = data => {
    console.log(data);
    const modalBodyContainer = document.getElementById('modal-body');
    modalBodyContainer.innerHTML = `
    
    <div style="background-color:#ffb6c1" class="card h-100 w-50  border-1">
            <div class="p-3">
                <h4>${data.description ? data.description : "No Description Found"}</h4>
                <div class="d-flex gap-2">
                    <p class="p-3 bg-white border-0 rounded">${data.pricing[0] ? data.pricing[0].price : "No Price Found"} ${data.pricing[0] ? data.pricing[0].plan : "No Plan found"}</p>

                    <p class="p-3 bg-white border-0 rounded">${data.pricing[1] ? data.pricing[1].price : "No price Found"} ${data.pricing[1] ? data.pricing[1].plan : "No Plan Found"}</p>

                    <p class="p-3 bg-white border-0 rounded">${data.pricing[2] ? data.pricing[2].price : "No price Found"} ${data.pricing[2] ? data.pricing[2].plan : "No plan Found"}</p>
                </div>
                <div class="d-flex gap-3">
                    <div>
                        <h3>Features</h3>
                        <ul>

                            <li>${data.features[1] ? data.features[1].feature_name : "No Feature name Found"}</li>
                            <li>${data.features[2] ? data.features[2].feature_name : "No Feature name Found"}</li>
                            <li>${data.features[3]? data.features[3].feature_name : "No Feature name Found"}</li>

                        </ul>
                    </div>
                    <div>
                        <h3>Integrations</h3>
                        <li>${data.integrations ? data.integrations[0] : "No Integrations Found"}</li>
                        <li>${data.integrations ? data.integrations[1] : "No Integrations Found"}</li>
                        <li>${data.integrations ? data.integrations[2] : "No Integrations Found"}</li>
                    </div>
                </div>

            </div>
        </div>
        <div class="card h-100 w-50">
            
            <img class="p-3 rounded" src="${data.image_link ? data.image_link : "No Image Found"}" class="card-img-top" alt="...">
            <div style="position: relative;bottom: 160px;
            left:150px;" class="container bg-danger w-50 text-center rounded">
            <p class="text-white">${data.accuracy.score ? data.accuracy.score : "No Score Found"}% accuracy</p>
            </div>
           
            <div class="card-body text-center">
                <h5>${data.input_output_examples[0] ? data.input_output_examples[0].input : "No Input Found"}</h5>
                <p>${data.input_output_examples[0] ? data.input_output_examples[0].output : "No Output Found"}</p>
                <h5>${data.input_output_examples[1] ? data.input_output_examples[1].input : "No input Found"}</h5>
                <p>${data.input_output_examples[1] ? data.input_output_examples[1].output : "No Output Found"}</p>

            </div>
        </div>
    
    `
}


loadFeatures();