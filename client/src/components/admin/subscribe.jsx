import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {  Link } from "react-router-dom";
import { getSubscribersThunk, sendMailToSubscribersThunk } from "../../features/thunks/subscribeThunk";
import AdminSidebar from "./adminSideBar";
import { clearAlert } from "../../features/slices/subscribeSlice";
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';


export default function Subscribe() {
    const dispatch = useDispatch();
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');

    const { subscribers, alert } = useSelector((state) => state.subscribe);

    useEffect(() => {
        dispatch(getSubscribersThunk());
    }, [dispatch]);

    const handleSendMail = async (e) => {
        e.preventDefault();
        if (!subject || !text) {
            alert("Lütfen konu ve mesaj giriniz.");
            return;
        }
        await dispatch(sendMailToSubscribersThunk({ subject, text })).unwrap();;
        setTimeout(() => {
            dispatch(clearAlert());
        }, 1000);
        setSubject('');
        setText('');
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
           <Link className="fs-2 mb-4 d-block text-decoration-none text-dark" to="/admin/products">
                               <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                           </Link>
                <AdminSidebar />
                <div className="col-md-9">
                    <h2 className="text-center mb-4">Bülten Aboneliği</h2>
                    {alert?.message && (
                        <div className={`alert alert-${alert?.type}`} role="alert">
                            {alert?.message}
                        </div>
                    )}

                    <div className="card shadow-lg mb-4">
                        <div className="p-4">
                            <h5 className="mb-3">Abonelere Mail Gönder</h5>
                            <form onSubmit={handleSendMail}>
                                <div className="mb-3">
                                    <label htmlFor="subject" className="form-label">Konu:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="text" className="form-label">Mesaj:</label>
                                    <textarea
                                        className="form-control"
                                        id="text"
                                        rows="4"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-dark">Mail Gönder</button>
                            </form>
                        </div>
                    </div>

                    <div className="card shadow-lg">
                        <div className="p-4">
                            <p>Toplam Abone: <strong>{subscribers.length}</strong></p>
                            <table className="table table-striped table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscribers.map((subscriber) => (
                                        <tr key={subscriber.id}>
                                            <td>{subscriber.id}</td>
                                            <td>{subscriber.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
