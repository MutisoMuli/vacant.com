import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList';

const Body = () => (
  <div className="flex flex-col flex-grow container mx-auto mt-10 bg-white">
    <div className="flex mb-10">
      <div className="w-1/2 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<PropertyForm />} />
          <Route path="/list" element={<PropertyList />} />
        </Routes>
      </div>
    </div>

    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-navy-blue mb-6">Revolutionizing Real Estate with Vacant</h2>

      <div className="mb-6 flex items-center">
        <div className="w-1/2">
          <h3 className="text-2xl font-semibold text-orange-600 mb-3">How Vacant Works</h3>
          <p className="text-navy-blue text-lg leading-relaxed">
            Vacant connects property owners with those looking for vacant living spaces. Our platform allows you to easily list your empty property or find a place to stay, all with the tap of a button. It's as simple as searching for available properties in your desired area and talking to the owner instantly.
          </p>
        </div>
        <div className="w-1/2">
          <img src="https://res.cloudinary.com/dhbztjzkr/image/upload/v1723033430/stanislav-lvovsky-IBH409mn0H0-unsplash_niiqh8.jpg" alt="How Vacant Works" className="rounded-lg shadow-md ml-4" style={{ height: '200px', objectFit: 'cover' }} />
        </div>
      </div>

      <div className="mb-6 flex items-center">
        <div className="w-1/2 order-2">
          <h3 className="text-2xl font-semibold text-orange-600 mb-3">Why Choose Vacant?</h3>
          <ul className="list-disc list-inside text-navy-blue text-lg leading-relaxed">
            <li>Completely free to use - no hidden costs or fees</li>
            <li>Turn your empty property into a source of income quickly</li>
            <li>Secure and verified user profiles</li>
            <li>Instant communication</li>
          </ul>
        </div>
        <div className="w-1/2 order-1">
          <img src="https://res.cloudinary.com/dhbztjzkr/image/upload/v1723033068/behnam-norouzi-yA6IK2hF4lk-unsplash_zv56ny.jpg" alt="Why Choose Vacant?" className="rounded-lg shadow-md mr-4" style={{ height: '200px', objectFit: 'cover' }} />
        </div>
      </div>

      <div className="mb-6 flex items-center">
        <div className="w-1/2">
          <h3 className="text-2xl font-semibold text-orange-600 mb-3">For Property Owners</h3>
          <p className="text-navy-blue text-lg leading-relaxed">
            Have a vacant house? Don't let it sit empty! With Vacant, you can easily list your property and start earning. Our platform connects you with verified guests looking for short-term stays, providing a steady stream of income with minimal effort on your part.
          </p>
        </div>
        <div className="w-1/2">
          <img src="https://res.cloudinary.com/dhbztjzkr/image/upload/v1723033045/yana-marudova-XodzG-Sg4l0-unsplash_zra138.jpg" alt="For Property Owners" className="rounded-lg shadow-md ml-4" style={{ height: '200px', objectFit: 'cover' }} />
        </div>
      </div>

      <div className="mb-6 flex items-center">
        <div className="w-1/2 order-2">
          <h3 className="text-2xl font-semibold text-orange-600 mb-3">Join the Housing Revolution</h3>
          <p className="text-navy-blue text-lg leading-relaxed">
            Vacant is transforming the way we think about housing. By utilizing empty spaces, we're creating a more efficient and sustainable housing market. Join us in making every house a home, even if just for a short while.
          </p>
        </div>
        <div className="w-1/2 order-1">
          <img src="https://res.cloudinary.com/dhbztjzkr/image/upload/v1723033043/quentin-dang-LQmZd5Wbf9Y-unsplash_dve1sg.jpg" alt="Join the Housing Revolution" className="rounded-lg shadow-md mr-4" style={{ height: '200px', objectFit: 'cover' }} />
        </div>
      </div>

      <div className="mt-8">
        <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
          Get Started - It's Free!
        </button>
      </div>
    </div>
  </div>
);

export default Body;
