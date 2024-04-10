import React, { useState } from 'react';
import useTitle from "../../hooks/useTitle";
import styles from "../../styles/admin/organizers.module.css"
import { useAppContext } from '../../context/contextProvider';
import {GiTrashCan} from "@react-icons/all-files/gi/GiTrashCan"
import {GiPencil} from "@react-icons/all-files/gi/GiPencil"
import {GrAdd} from "@react-icons/all-files/gr/GrAdd"
import toast from "react-hot-toast";
import { User } from "../../models";
import { Link } from 'react-router-dom';

function OrganizersPage() {
    useTitle(`Users | FestiPlan`)
    const {data, setData, modal} = useAppContext();

    async function deleteUser(user) {
        setData({...data, users: data.users.filter(u => u.id !== user.id)})
    }

    function handleDelete(user) {
        // modal.open(
        //     <ConfirmDeleteModal user={user} onConfirm={deleteUser} />
        // )
    }

    async function editUser(newUser) {
        const copy = [...data.users];
        const index = copy.findIndex(u => u.id === newUser.id);
        copy[index] = newUser;
        setData({...data, users: copy});
    }

    function handleEdit(user) {
        // modal.open(
        //     <EditUserModal user={user} onConfirm={editUser} />,
        //     {contentWrapperClassName: styles.wrapper    }
        // )
    }

    return (
        <>
            <h1>All festival organizers</h1>
            <button style={{maxWidth: 100}} className={styles.action_button}><GrAdd /> New </button>
            <div className={styles.table_wrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Year</th>
                            <th>Festivals</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.organizers.map(organizer => {
                                return (
                                    <tr key={organizer.id}>
                                        <td>
                                            <div className={styles.logo_containter}>
                                                <img src={organizer.logo} alt={organizer.name} />
                                            </div>
                                        </td>
                                        <td>{organizer.name}</td>
                                        <td>{organizer.address}</td>
                                        <td>{organizer.contactPhone}</td>
                                        <td>{organizer.email}</td>
                                        <td>{organizer.yearOfEstablishment}</td>
                                        <td><Link to={`/admin/organizers/${organizer.id}/festivals`}>{organizer.festivals.length} Festivals</Link></td>
                                        <td>
                                            <div className={styles.action_button} onClick={() => handleEdit(organizer)}>
                                                <GiPencil size={20} />
                                                <span>
                                                    Edit    
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.action_button} onClick={() => handleDelete(organizer)}>
                                                <GiTrashCan size={20} />
                                                <span>
                                                    Delete    
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

export default OrganizersPage;


function ConfirmDeleteModal({user, onConfirm}) {
    const {modal} = useAppContext()
    function handleDelete() {
        onConfirm(user)
        modal.close()
    }
    return (
        <div>
            <h2>Are you sure you want to delete {user.name} {user.surname}?</h2>
            <div className={styles.buttons} style={{marginTop: "0.75rem"}}>
                <div>
                    <button type='submit' onClick={handleDelete}>Yes</button>
                    <button onClick={modal.close}>No</button>
                </div>
            </div>
        </div>
    )
}

function EditUserModal({user, onConfirm}) {
    const {modal} = useAppContext()
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        name: { value: user.name, error: false}, 
        surname: { value: user.surname, error: false}, 
        email: { value: user.email, error: false}, 
        username: { value: user.username, error: false},  
        address: { value: user.address, error: false}, 
        profession: { value: user.profession, error: false}, 
        phone: { value: user.phone, error: false}, 
        birthday: { value: user.dateOfBirth, error: false }
    })

    function handleSubmit(event) {
        event.preventDefault();
        if(
            (formData.name.error || formData.surname.error || formData.email.error || formData.username.error) || 
            (formData.address.error || formData.profession.error || formData.phone.error || formData.birthday.error) 
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }
        const newUser = new User(user.id, formData.username.value, user.password, formData.name.value, formData.surname.value, formData.email.value, formData.birthday.value, formData.address.value, formData.phone.value, formData.profession.value);
        onConfirm(newUser);
        modal.close()
    }

    function handleNext() {
        if(currentStep === 1) return;
        setCurrentStep(currentStep + 1);
    }
    function handlePrevious() {
        if(currentStep === 0) return;
        setCurrentStep(currentStep - 1);
    }

    function handleOnlyRequiredChange(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: {value, error: !value}});
    }

    function handleEmailChange(e) {
        const {name, value} = e.target;
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        setFormData({...formData, [name]: {value, error: !emailRegex.test(value)}});
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Edit user {currentStep+1}/2</h2>
            <div style={{
                position: "relative",
                overflowX: "hidden",
                width: "100%",
                alignSelf: "stretch",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <div className={styles.inputs} style={{
                    transform: `translateX(-${currentStep * 101}%)`
                }}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input 
                            style={{
                                border: (formData.name.error != null ? 
                                    `2px solid ${(formData.name.error ? "red" : "green")}` : 
                                    "none")
                            }} 
                            type="text" id="name" name="name" 
                            value={formData.name.value} onChange={handleOnlyRequiredChange} 
                        />
                    </div>
                    <div>
                        <label htmlFor="surname">Surname:</label>
                        <input 
                            style={{
                                border: (formData.surname.error != null ? 
                                    `2px solid ${(formData.surname.error ? "red" : "green")}` : 
                                    "none")
                            }}
                            type="text" id="surname" name="surname" 
                            value={formData.surname.value} onChange={handleOnlyRequiredChange} 
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input 
                            style={{
                                border: (formData.email.error != null ? 
                                    `2px solid ${(formData.email.error ? "red" : "green")}` : 
                                    "none")
                            }}
                            type="text" id="email" name="email" 
                            value={formData.email.value} onChange={handleEmailChange} 
                        />
                    </div>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input 
                            style={{
                                border: (formData.username.error != null ? 
                                    `2px solid ${(formData.username.error ? "red" : "green")}` : 
                                    "none")
                            }}
                            type="text" id="username" name="username"
                            value={formData.username.value} onChange={handleOnlyRequiredChange}
                        />
                    </div>
                </div>
                
                <div className={styles.inputs} style={{
                    transform: `translateX(-${(currentStep) * 100}%) translateY(-50%)`,
                    position: "absolute",
                    right: "-100%",
                    top: "50%"
                }}>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input 
                            style={{
                                border: (formData.address.error != null ? 
                                    `2px solid ${(formData.address.error ? "red" : "green")}` : 
                                    "none")
                            }}
                            type="text" id="address" name="address"
                            value={formData.address.value} onChange={handleOnlyRequiredChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="profession">Profession:</label>
                        <input 
                            style={{
                                border: (formData.profession.error != null ? 
                                    `2px solid ${(formData.profession.error ? "red" : "green")}` : 
                                    "none")
                            }}
                            type="text" id="profession" name="profession"
                            value={formData.profession.value} onChange={handleOnlyRequiredChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input 
                            style={{
                                border: (formData.phone.error != null ? 
                                    `2px solid ${(formData.phone.error ? "red" : "green")}` : 
                                    "none")
                            }}
                            type="tel" id="phone" name="phone" 
                            value={formData.phone.value} onChange={handleOnlyRequiredChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="birthday">Date of birth:</label>
                        <input 
                            style={{
                                border: (formData.birthday.error != null ? 
                                    `2px solid ${(formData.birthday.error ? "red" : "green")}` : 
                                    "none")
                            }}
                            type="date" id="birthday" name="birthday"
                            value={formData.birthday.value} onChange={handleOnlyRequiredChange}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={modal.close}>Cancel</button>
                </div>
                <div>
                    {
                        currentStep > 0 && <button type="button" onClick={handlePrevious}>Back</button>
                    }
                    {
                        currentStep < 1 && <button type="button" onClick={handleNext}>Next</button>
                    }
                </div>
            </div>
        </form>
    );
}