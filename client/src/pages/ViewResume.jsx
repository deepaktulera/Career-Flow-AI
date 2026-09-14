import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { showMyResume } from "../services/resumeService";
import { ArrowRightToLine } from 'lucide-react';
import ClassicTemplate from "../components/resumeTemplates/ClassicTemplate";

const ViewResume = () => {
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await showMyResume(id);
                setData(response.resume);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-600">Loading resume...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-red-500">Resume not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto rounded-lg my-2 flex justify-end p-2">
                <div className="flex justify-center items-center gap-2">
                    <Link className="bg-blue-500 p-1 rounded text-white text-xs text-center" to={'/dashboard'}>Back <ArrowRightToLine size={12} className="inline text-center" /></Link>
                </div>
            </div>

            {/* Resume */}
            {data.template === "classic" && <ClassicTemplate data={data} />}
            {data.template === "modern" && <ModernTemplate data={data} />}
            {data.template === "minimal" && <MinimalTemplate data={data} />}


        </div>
    );
};

export default ViewResume;