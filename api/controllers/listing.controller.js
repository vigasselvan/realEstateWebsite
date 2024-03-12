import Listing from '../models/listing.modal.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {

    try{
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    }catch(error){
        next(error);
    }

};

export const deleteListing = async (req, res, next) => {

    const listing = await Listing.findById(req.params.id);
    
    if(!listing){
        return res.status(404).json({message: "Listing not found"});
    }

    if(req.user.id !== listing.userRef){
        return res.status(401).json({message: "You are not authorized to delete this listing"});
    }

    try{
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Listing deleted successfully"});
    } catch(error){
        next(error);
    }

}

export const updateListing = async (req, res, next) => {

    const listing = await Listing.findById(req.params.id);

    if(!listing){
        return next(errorHandler("Listing not found", 404));
    }

    if(req.user.id !== listing.userRef){
        return next(errorHandler("You are not authorized to update this listing", 401));
    }

    try{
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true});  // {new: true} is used to return the updated listing, not the old one
        return res.status(200).json(updatedListing);
    } catch(error){
        next(error);
    }

}

export const getListing = async (req, res, next) => {
    try{
        const listing = await Listing.findById(req.params.id);
    
        if(!listing){
            return next(errorHandler("Listing not found", 404));
        }
        
        return res.status(200).json(listing);
    } catch(error){
        next(error);
    }

}