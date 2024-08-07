import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const ServicePage = () => {
    const [serviceName, setServiceName] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [lowestAmount, setLowestAmount] = useState(0);
    const [highestAmount, setHighestAmount] = useState(10000);
    const [pincode, setPincode] = useState('');
    const [error, setError] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [videoFiles, setVideoFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [videoPreviews, setVideoPreviews] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    
    const serviceCategories = [
        "Event Planning", "Catering Services", "Decorations", "Entertainment",
        "Photography and Videography", "Sound and Lighting", "Makeup and Styling",
        "Transport Services", "Security Services", "Logistics and Rentals",
        "Invitations and Stationery", "Guest Management", "Cleanup Services", "Other Services"
    ];

    const serviceTypes = [
        "Wedding Services", "Corporate Events", "Birthday Parties",
        "Festivals and Celebrations", "Private Events", "Outdoor Events",
        "Photography Packages", "Catering Packages", "Event Decor Styles",
        "Live Entertainment", "AV Equipment Rental", "Transportation Services",
        "Styling Services", "Logistics Coordination", "Full-Service Event Planning"
    ];

    const addServiceCategory = (category) => {
        if (!selectedServices.includes(category)) {
            setSelectedServices([...selectedServices, category]);
        }
    };

    const removeServiceCategory = (category) => {
        setSelectedServices(selectedServices.filter(service => service !== category));
    };

    useEffect(() => {
        const getLocation = async () => {
            if (pincode.length === 6) {
                try {
                    setError('');
                    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
                    const response = await axios.get(
                        `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&key=${apiKey}`
                    );
                    if (response.data.status === 'OK') {
                        const result = response.data.results[0];
                        setLocation(result.formatted_address);
                    } else {
                        setError('Location not found. Please check the pincode and try again.');
                    }
                } catch (err) {
                    setError('An error occurred while fetching the location data.');
                }
            }
        };

        getLocation();
    }, [pincode]); // Runs the function when pincode changes

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!serviceName || !serviceType || !location || !description || selectedServices.length === 0) {
            setError('Please fill in all required fields.');
            return;
        }

        const formData = {
            serviceName,
            serviceType,
            location,
            description,
            lowestAmount,
            highestAmount,
            images: imageFiles,
            videos: videoFiles,
            selectedServices,
        };

        console.log('Form submitted:', formData);
        console.log('Image files:', imageFiles);
        console.log('Video files:', videoFiles);
        console.log('Selected services:', selectedServices);

        // Reset form state
        setServiceName('');
        setServiceType('');
        setLocation('');
        setDescription('');
        setLowestAmount(0);
        setHighestAmount(10000);
        setPincode('');
        setImageFiles([]);
        setVideoFiles([]);
        setImagePreviews([]);
        setVideoPreviews([]);
        setSelectedServices([]);
        setError('');
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles((prevFiles) => [...prevFiles, ...files]);
        setImagePreviews((prevPreviews) => [
            ...prevPreviews,
            ...files.map(file => URL.createObjectURL(file)),
        ]);
    };

    const handleVideoChange = (e) => {
        const files = Array.from(e.target.files);
        setVideoFiles((prevFiles) => [...prevFiles, ...files]);
        setVideoPreviews((prevPreviews) => [
            ...prevPreviews,
            ...files.map(file => URL.createObjectURL(file)),
        ]);
    };

    return (
        <div className="service-page-container">
            <h1> Service Page</h1>
            <form className="service-form" onSubmit={handleSubmit}>
                <div className="service-form-group">
                    <label htmlFor="serviceName" className="service-label">Service Name:</label>
                    <input
                        type="text"
                        id="serviceName"
                        className="service-input"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                    />
                </div>

                <div className="service-form-group">
                    <label htmlFor="serviceType" className="service-label">Service Type:</label>
                    <select
                        id="serviceType"
                        className="service-select"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                    >
                        <option value="">Select Service Type</option>
                        {serviceTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="service-form-group">
                    <label htmlFor="servicePincode" className="service-label">Pincode:</label>
                    <input
                        type="text"
                        id="servicePincode"
                        className="service-input"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>

                <div className="service-form-group">
                    <label htmlFor="serviceLocation" className="service-label">Location:</label>
                    <input
                        type="text"
                        id="serviceLocation"
                        className="service-input"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        readOnly
                    />
                </div>

                <div className="service-form-group">
                    <label htmlFor="serviceDescription" className="service-label">Description:</label>
                    <textarea
                        id="serviceDescription"
                        className="service-textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="service-form-group">
                    <label className="service-label">Available Services:</label>
                    <div className="available-services">
                        {serviceCategories.map((category, index) => (
                            <div key={index} className="available-service">
                                <span>{category}</span>
                                <button type="button" onClick={() => addServiceCategory(category)}>+</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="selected-services-container">
                    <h3>Selected Services:</h3>
                    {selectedServices.map((service, index) => (
                        <div key={index} className="selected-service">
                            <span>{service}</span>
                            <button type="button" onClick={() => removeServiceCategory(service)}>-</button>
                        </div>
                    ))}
                </div>

                <div className="service-form-group">
                    <label htmlFor="serviceLowestAmount" className="service-label">Lowest Amount: ₹{lowestAmount}</label>
                    <input
                        type="range"
                        id="serviceLowestAmount"
                        className="service-range"
                        min="0"
                        max="100000"
                        value={lowestAmount}
                        onChange={(e) => setLowestAmount(Number(e.target.value))}
                    />
                </div>

                <div className="service-form-group">
                    <label htmlFor="serviceHighestAmount" className="service-label">Highest Amount: ₹{highestAmount}</label>
                    <input
                        type="range"
                        id="serviceHighestAmount"
                        className="service-range"
                        min="0"
                        max="1000000"
                        value={highestAmount}
                        onChange={(e) => setHighestAmount(Number(e.target.value))}
                    />
                </div>

                <div className="service-form-group">
                    <label htmlFor="serviceImageUpload" className="service-label">Upload Images:</label>
                    <input
                        type="file"
                        id="serviceImageUpload"
                        className="service-file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />
                    {imagePreviews.map((preview, index) => (
                        <img key={index} src={preview} alt={`Preview ${index + 1}`} className="service-image-preview" />
                    ))}
                </div>

                <div className="service-form-group">
                    <label htmlFor="serviceVideoUpload" className="service-label">Upload Videos:</label>
                    <input
                        type="file"
                        id="serviceVideoUpload"
                        className="service-file"
                        accept="video/*"
                        multiple
                        onChange={handleVideoChange}
                    />
                    {videoPreviews.map((videoPreview, index) => (
                        <video key={index} controls className="service-video-preview">
                            <source src={videoPreview} type={videoFiles[index]?.type} />
                            Your browser does not support the video tag.
                        </video>
                    ))}
                </div>
                <div className='submit-container'>
                    <button type="submit" className="service-button">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ServicePage;
