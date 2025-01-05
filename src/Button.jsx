import React, { useState } from 'react'

const Button = () => {
    const data = {

        Pakistan: {
            Punjab: ["Lahore", "Rawalpindi", "Faisalabad", "Multan", "Gujranwala", "Sialkot", "Sargodha", "Bahawalpur", "Sheikhupura", "Jhelum"],
            Sindh: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Mirpur Khas", "Nawabshah", "Badin", "Jacobabad", "Shikarpur", "Khairpur"],
            KhyberPakhtunkhwa: ["Peshawar", "Mardan", "Abbottabad", "Swat", "Kohat", "Dera Ismail Khan", "Bannu", "Chitral", "Mansehra", "Nowshera"],
            Balochistan: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Sibi", "Zhob", "Dera Murad Jamali", "Chaman", "Hub", "Pishin"],
            GilgitBaltistan: ["Gilgit", "Skardu", "Hunza", "Diamer", "Ghanche", "Astore", "Nagar", "Kharmang", "Shigar", "Ghizer"],
            AzadKashmir: ["Muzaffarabad", "Mirpur", "Kotli", "Bagh", "Rawalakot", "Pallandri", "Sudhanoti", "Bhimber", "Haveli", "Neelum Valley"],
            Islamabad: ["Islamabad"]
        },
        USA: {
            California: ["Los Angeles", "San Francisco", "San Diego"],
            Texas: ["Houston", "Austin", "Dallas"],
        },
        Canada: {
            Ontario: ["Toronto", "Ottawa"],
            Quebec: ["Montreal", "Quebec City"],
        },
        India: {
            Maharashtra: ["Mumbai", "Pune", "Nagpur"],
            Karnataka: ["Bangalore", "Mysore", "Hubli"],
            Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
        },
        SaudiArabia: {
            Riyadh: ["Riyadh City", "Al Kharj", "Diriyah"],
            Jeddah: ["Jeddah City", "Mecca", "Taif"],
            EasternProvince: ["Dammam", "Khobar", "Dhahran"],
        },
    };

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");

    const [result, setResult] = useState("");
    const [output, setOutput] = useState('');

    const handleCountryChange = (country) => {
        setSelectedCountry(country);
        setStates(Object.keys(data[country] || {}));
        setSelectedState("");
        setCities([]);
    };

    const handleStateChange = (state) => {
        setSelectedState(state);
        setCities(data[selectedCountry]?.[state] || []);
    };

    const handleCityChange = (city) => {
        setSelectedCity(city);
      };
    const display = () => {
        setOutput(document.getElementById('input').value);
    }
    const handleSubmit = () => {
        if (selectedCountry && selectedState && selectedCity) {
          setResult(`Country: ${selectedCountry}, State: ${selectedState}, City: ${selectedCity}`);
        } else {
          setResult("Please make all selections.");
        }
      };

    return (
        <>
            <div className='flex gap-5 h-[600px] w-full items-center justify-center bg-slate-200'>
                <div className='flex flex-col gap-2 h-[600px] w-full items-center justify-center border-r-2 border-gray-500'>
                    <p className='text-2xl font-bold text-gray-400'>Enter a Word</p>
                    <input id='input' type="text" placeholder="Enter here" className='border rounded p-1 border-black' />
                    <button className='border rounded text-sm flex justify-center items-center  border-blue-700  h-8 w-fit p-2 bg-blue-600 hover:bg-blue-700 text-white' onClick={display} >Show Output</button>
                    <div className='h-52 flex p-2 flex-col gap-2 w-52 border-2 border-black  rounded-xl' >
                        <h1 className='text-xl font-bold text-gray-400'>OUTPUT</h1>
                        <div className='h-full flex justify-center items-center'>
                            <p className='text-md font-semibold '>{output}</p>

                        </div>
                    </div>

                </div>



                <div className='flex flex-col gap-2 h-[600px] w-full items-center justify-center border-r-2 '>

                    <div className="p-4 flex flex-col gap-4">
                        {/* Country Dropdown */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Country
                            </label>
                            <select
                                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                value={selectedCountry}
                                onChange={(e) => handleCountryChange(e.target.value)}
                            >
                                <option value="">Select a country</option>
                                {Object.keys(data).map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* State Dropdown */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                State
                            </label>
                            <select
                                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                value={selectedState}
                                onChange={(e) => handleStateChange(e.target.value)}
                                disabled={!selectedCountry}
                            >
                                <option value="">Select a state</option>
                                {states.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* City Dropdown */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                City
                            </label>
                            <select
                                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"

                                value={selectedCity}
                                onChange={(e) => handleCityChange(e.target.value)}
                                disabled={!selectedState}
                            >
                                <option value="">Select a city</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>



                    <button className='border rounded text-sm flex justify-center items-center  border-blue-700  h-8 w-fit p-2 bg-blue-600 hover:bg-blue-700 text-white' onClick={handleSubmit} >SUBMIT</button>
                    <div className='h-52 flex p-2 flex-col gap-2 w-52 border-2 border-black rounded-xl' >
                        <h1 className='text-xl font-bold text-gray-400'>OUTPUT</h1>
                        <div className='h-full flex justify-center items-center'>
                            <p className='text-md font-semibold '>{result}</p>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Button


