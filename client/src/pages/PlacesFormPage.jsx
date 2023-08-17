import React, { useEffect, useState } from 'react'
import PhotosUploader from '../PhotosUploader'
import Perks from '../Perks'
import AccountNav from '../AccountNav'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'

const PlacesFormPage=() => {
    const {id} = useParams();
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
        })
    },[id])

    function inputHeader(text) {
        return (
            <span className="text-2xl mt-4 font-semibold">{text}</span>
        )
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function savePlace(ev){
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
                description, perks, extraInfo, 
                checkIn, checkOut, maxGuests
        }
        if(id){
            await axios.put('/places', { 
                id,...placeData
            })
            setRedirect(true)
        }else{
            await axios.post('/places', placeData)
            setRedirect(true)
        }
    }

    if(redirect){
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for your places should be short and catchy as in advertisement')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for eg: My lovely apt" />
                {preInput('Address', 'Address to this place')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                {preInput('Photos', 'more = better')}

                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput('Description', 'desciption of the place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                {preInput('Perks', 'Select all the perks of your place')}

                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                {preInput('Extra info', 'house rules, etc')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                {preInput('Check in&out times', 'add checks in and out times, remember to have some time window for cleaning the room between guests')}
                <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                        <span className="mt-2 -mb-1">Check in time</span>
                        <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14" />
                    </div>
                    <div>
                        <span className="mt-2 -mb-1">Check out time</span>
                        <input type="text" placeholder="22" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                    <div>
                        <span className="mt-2 -mb-1">Max number of guests</span>
                        <input type="number" placeholder="1" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                </div>
                <button className="primary my-4">Save</button>
            </form>
        </div>
    )
}

export default PlacesFormPage