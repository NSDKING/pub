"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { createAnnonceurs } from '@/src/graphql/mutations'; // Ensure this path is correct
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsconfig from '../../src/aws-exports';

Amplify.configure(awsconfig);
const client = generateClient();

export default function AddDataAdvertisers() {
    const router = useRouter();
    const [name, setName] = useState<string | undefined>();
    const [number, setNumber] = useState<number | undefined>();
    const [mail, setMail] = useState<string | undefined>();
    const [id, setId] = useState<string | undefined>();

    useEffect(() => {
        // Fetch query parameters from URL
        const queryParams = new URLSearchParams(window.location.search);
        const data = queryParams.get('data');

        if (data) {
            const parsedData = JSON.parse(data);
            setName(parsedData.name);
            setNumber(parsedData.number);
            setMail(parsedData.mail);
            setId(parsedData.id);
        }
    }, []);

    const handleSubmit = async () => {
        if (!name || number === undefined || !mail || !id) {
            console.error("Incomplete data.");
            return;
        }

        try {
            // Call the mutation to create the advertiser
            await client.graphql({
                query: createAnnonceurs,
                variables: {
                    input: {
                        id: id,
                        Nom: name,
                        numero: number,
                        mail: mail
                    }
                }
            });

            router.push('/extern');
        } catch (error) {
            console.error('Error creating advertiser:', error);
        }
    };

    return (
        <Authenticator>
            {({ signOut, user }) => (
                <main>
                    <div className="container mx-auto p-4">
                        <h1 className="text-2xl font-bold mb-4">Add New Advertiser</h1>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name || ''}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-1/4 h-10 outline-none border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="number" className="block text-sm font-medium text-gray-700">Number</label>
                                <input
                                    id="number"
                                    type="number"
                                    value={number || ''}
                                    onChange={(e) => setNumber(Number(e.target.value))}
                                    className="mt-1 block w-1/4 h-10 outline-none border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="mail" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    id="mail"
                                    type="email"
                                    value={mail || ''}
                                    onChange={(e) => setMail(e.target.value)}
                                    className="mt-1 block w-1/4 h-10 outline-none border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-green-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </main>
            )}
        </Authenticator>
    );
}
