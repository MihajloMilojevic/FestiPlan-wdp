import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTitle from "../../hooks/useTitle";
import { useAppContext } from '../../context/contextProvider';
import NotFound from '../404';
import {GiTrashCan} from "@react-icons/all-files/gi/GiTrashCan"
import {GiPencil} from "@react-icons/all-files/gi/GiPencil"
import {GrAdd} from "@react-icons/all-files/gr/GrAdd"
import {GrNext} from "@react-icons/all-files/gr/GrNext"
import {GrPrevious} from "@react-icons/all-files/gr/GrPrevious"
import toast from "react-hot-toast";
import { Organizer, User } from "../../models";
import { Link } from 'react-router-dom';
import { SearchableText } from '../../components/common';
import validateImageUrl from '../../utils/validateImageUrl';
import styles from "../../styles/admin/festivals.module.css"

export default function OrganizersFestivalsPage() {
    const {data, setData, modal} = useAppContext();
    const {organizerId} = useParams();
    const organizer = useMemo(() => data.organizers.find(o => o.id === organizerId), [data, organizerId]);
    useTitle(`${organizer?.name + "'s Festivals" ?? "Not Found"} | FestiPlan`)

    if (!organizer) 
        return <NotFound url="/admin" />

    async function deleteFestival(festival) {
        organizer.festivals = organizer.festivals.filter(f => f.id !== festival.id);
        const copy = [...data.organizers];
        const index = copy.findIndex(o => o.id === organizer.id);
        copy[index] = organizer;
        setData({...data, organizers: copy});
    }

    function handleDelete(festival) {
        modal.open(
            <ConfirmDeleteModal festival={festival} onConfirm={deleteFestival} />
        )
    }

    // async function editOrganizer(newOrganizer) {
    //     const copy = [...data.organizers];
    //     const index = copy.findIndex(o => o.id === newOrganizer.id);
    //     copy[index] = newOrganizer;
    //     setData({...data, organizers: copy});
    // }

    // function handleEdit(organizer) {
    //     modal.open(
    //         <OrganizerDataModal organizer={organizer} onConfirm={editOrganizer} />,
    //         {contentWrapperClassName: styles.wrapper    }
    //     )
    // }

    // async function createOrganizer(newOrganizer) {
    //     setData({...data, organizers: [...data.organizers, newOrganizer]})
    // }

    // function handleCreate() {
    //     modal.open(
    //         <OrganizerDataModal onConfirm={createOrganizer} />,
    //         {contentWrapperClassName: styles.wrapper}
    //     )
    // }

    return (
        <>
            <h1><SearchableText text={`All ${organizer.name}'s Festivals`} /></h1>
            <button 
                // onClick={handleCreate} 
                style={{maxWidth: 100}} 
                className={styles.action_button}
            >
                <GrAdd /> 
                <SearchableText text="New" />
            </button>
            <div className={styles.table_wrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th><SearchableText text="Images" /></th>
                            <th><SearchableText text="Name" /></th>
                            <th><SearchableText text="Type" /></th>
                            <th><SearchableText text="Transportation" /></th>
                            <th><SearchableText text="Price" /></th>
                            <th><SearchableText text="Maximum People" /></th>
                            <th><SearchableText text="Description" /></th>
                            <th colSpan={2}><SearchableText text="Actions" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            organizer.festivals.map(festival => {
                                return (
                                    <tr key={festival.id}>
                                        <td>
                                            <FestivalGallery festival={festival} />
                                        </td>
                                        <td><SearchableText text={festival.name} /></td>
                                        <td><SearchableText text={festival.type} /></td>
                                        <td><SearchableText text={festival.transportation} /></td>
                                        <td><SearchableText text={festival.price} /></td>
                                        <td><SearchableText text={festival.maxPerson} /></td>
                                        <td><SearchableText text={festival.description} /></td>
                                        <td>
                                            <div 
                                                className={styles.action_button} 
                                                // onClick={() => handleEdit(organizer)}
                                            >
                                                <GiPencil size={20} />
                                                <span>
                                                    <SearchableText text="Edit" />
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div 
                                                className={styles.action_button} 
                                                onClick={() => handleDelete(festival)}
                                            >
                                                <GiTrashCan size={20} />
                                                <span>
                                                    <SearchableText text="Delete" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

function FestivalGallery({festival}) {
    
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div className={styles.gallery}>
            {
                festival.images.map((image, index) => (
                    <img className={`${styles.image} ${index === activeIndex ? styles.active : ""}`} key={index} src={image} alt={festival.name + (index+1)} />
                ))
            }
            <button 
                className={styles.btn} 
                onClick={() => setActiveIndex(prev => (prev - 1 + festival.images.length) % festival.images.length)}
            >
                <GrPrevious size={15} />
            </button>
            <button 
                className={styles.btn} 
                onClick={() => setActiveIndex(prev => (prev + 1) % festival.images.length)}
            >
                <GrNext size={15} />
            </button>
            <div className={styles.circle_list}>
                {festival.images.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.circle} ${index == activeIndex ? styles.current : ""}`} 
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
        </div>
    )
}

function ConfirmDeleteModal({festival, onConfirm}) {
    const {modal} = useAppContext()
    function handleDelete() {
        onConfirm(festival)
        modal.close()
    }
    return (
        <div>
            <h2>Are you sure you want to delete {festival.name}?</h2>
            <div className={styles.buttons} style={{marginTop: "0.75rem"}}>
                <div>
                    <button type='submit' onClick={handleDelete}>Yes</button>
                    <button onClick={modal.close}>No</button>
                </div>
            </div>
        </div>
    )
}
// function getInitialFormData(organizer) {
//     if(organizer) return {
//         name: {value: organizer.name, error: false},
//         address: {value: organizer.address, error: false},
//         contactPhone: {value: organizer.contactPhone, error: false},
//         email: {value: organizer.email, error: false},
//         yearOfEstablishment: {value: organizer.yearOfEstablishment, error: false},
//         logo: {value: organizer.logo, error: false},
//     }
//     return {
//         name: {value: "", error: null},
//         address: {value: "", error: null},
//         contactPhone: {value: "", error: null},
//         email: {value: "", error: null},
//         yearOfEstablishment: {value: "", error: null},
//         logo: {value: "", error: null},
//     }
// }

// function OrganizerDataModal({organizer, onConfirm}) {
//     const {modal} = useAppContext()
//     const [currentStep, setCurrentStep] = useState(0)
//     const [formData, setFormData] = useState(getInitialFormData(organizer))

//     async function handleSubmit(event) {
//         event.preventDefault();
//         if(
//             formData.name.error == null || formData.address.error == null || formData.contactPhone.error == null || 
//             formData.email.error == null || formData.yearOfEstablishment.error == null || formData.logo.error == null ||
//             formData.name.error || formData.address.error || formData.contactPhone.error || 
//             formData.email.error || formData.yearOfEstablishment.error || formData.logo.error
//         ) {
//             toast.error("Please fill in all required fields.");
//             return;
//         }
//         const isImageValid = await validateImageUrl(formData.logo.value);
//         if(!isImageValid) {
//             toast.error("Invalid image url.");
//             return;
//         }
//         const newOrganizer = new Organizer(organizer ? organizer.id : Math.random().toString(), formData.name.value, formData.address.value, formData.yearOfEstablishment.value, formData.logo.value, formData.contactPhone.value, formData.email.value, organizer ? organizer.festivals : []);
//         onConfirm(newOrganizer);
//         modal.close()
//     }

//     function handleNext() {
//         if(currentStep === 1) return;
//         setCurrentStep(currentStep + 1);
//     }
//     function handlePrevious() {
//         if(currentStep === 0) return;
//         setCurrentStep(currentStep - 1);
//     }

//     function handleOnlyRequiredChange(e) {
//         const {name, value} = e.target;
//         setFormData({...formData, [name]: {value, error: !value}});
//     }

//     function handleEmailChange(e) {
//         const {name, value} = e.target;
//         const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//         setFormData({...formData, [name]: {value, error: !emailRegex.test(value)}});
//     }
//     return (
//         <form className={styles.form} onSubmit={handleSubmit}>
//             <h2>{organizer ? "Edit" : "Create"} organizer {currentStep+1}/2</h2>
//             <div style={{
//                 position: "relative",
//                 overflowX: "hidden",
//                 width: "100%",
//                 alignSelf: "stretch",
//                 flex: 1,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 flexDirection: "column"
//             }}>
//                 <div className={styles.inputs} style={{
//                     transform: `translateX(-${currentStep * 101}%)`
//                 }}>
//                     <div>
//                         <label htmlFor="name">Name:</label>
//                         <input 
//                             style={{
//                                 border: (formData.name.error != null ? 
//                                     `2px solid ${(formData.name.error ? "red" : "green")}` : 
//                                     "none")
//                             }} 
//                             type="text" id="name" name="name" 
//                             value={formData.name.value} onChange={handleOnlyRequiredChange} 
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="address">Address:</label>
//                         <input 
//                             style={{
//                                 border: (formData.address.error != null ? 
//                                     `2px solid ${(formData.address.error ? "red" : "green")}` : 
//                                     "none")
//                             }}
//                             type="text" id="address" name="address"
//                             value={formData.address.value} onChange={handleOnlyRequiredChange}
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="email">Email:</label>
//                         <input 
//                             style={{
//                                 border: (formData.email.error != null ? 
//                                     `2px solid ${(formData.email.error ? "red" : "green")}` : 
//                                     "none")
//                             }}
//                             type="text" id="email" name="email" 
//                             value={formData.email.value} onChange={handleEmailChange} 
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="contactPhone">Phone:</label>
//                         <input 
//                             style={{
//                                 border: (formData.contactPhone.error != null ? 
//                                     `2px solid ${(formData.contactPhone.error ? "red" : "green")}` : 
//                                     "none")
//                             }}
//                             type="tel" id="contactPhone" name="contactPhone" 
//                             value={formData.contactPhone.value} onChange={handleOnlyRequiredChange}
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="yearOfEstablishment">Year of Establishment:</label>
//                         <input 
//                             style={{
//                                 border: (formData.yearOfEstablishment.error != null ? 
//                                     `2px solid ${(formData.yearOfEstablishment.error ? "red" : "green")}` : 
//                                     "none")
//                             }}
//                             type="number" id="yearOfEstablishment" name="yearOfEstablishment" 
//                             value={formData.yearOfEstablishment.value} onChange={handleOnlyRequiredChange}
//                         />
//                     </div>
//                 </div>
                
//                 <div className={styles.inputs} style={{
//                     transform: `translateX(-${(currentStep) * 100}%) translateY(-50%)`,
//                     position: "absolute",
//                     right: "-100%",
//                     top: "50%"
//                 }}>
//                     <div>
//                         <label htmlFor="logo">Logo:</label>
//                         <input 
//                             style={{
//                                 border: (formData.logo.error != null ? 
//                                     `2px solid ${(formData.logo.error ? "red" : "green")}` : 
//                                     "none")
//                             }}
//                             type="text" id="logo" name="logo"
//                             value={formData.logo.value} onChange={handleOnlyRequiredChange}
//                         />
//                     </div>
//                     <div className={styles.form_logo}>
//                         <img src={formData.logo.error || formData.logo.error == null ? "/no-image.svg" : formData.logo.value} alt="Invalid url" />
//                     </div>
//                 </div>
//             </div>
//             <div className={styles.buttons}>
//                 <div>
//                     <button type="submit">Save</button>
//                     <button type="button" onClick={modal.close}>Cancel</button>
//                 </div>
//                 <div>
//                     {
//                         currentStep > 0 && <button type="button" onClick={handlePrevious}>Back</button>
//                     }
//                     {
//                         currentStep < 1 && <button type="button" onClick={handleNext}>Next</button>
//                     }
//                 </div>
//             </div>
//         </form>
//     );
// }