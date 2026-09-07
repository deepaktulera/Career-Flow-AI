import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showMyResume } from "../services/resumeService";

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

    const personalInfo = data.personalInfo;

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">

            {/* Resume */}
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">

                {/* Header */}
                <div className="bg-slate-900 text-white p-8 flex justify-between w-full">

                    <div className="flex flex-col sm:flex-row items-center gap-6">

                        {/* Profile Image */}
                        {personalInfo.profilePic && (
                            <img
                                src={personalInfo.profilePic}
                                alt="Profile"
                                className="w-28 aspect-square rounded-full object-cover border-4 border-white"
                            />
                        )}

                        {/* Personal Info */}
                        <div className="text-center sm:text-left">

                            <h1 className="text-3xl font-bold">
                                {personalInfo.name}
                            </h1>

                            <p className="text-xl text-blue-300 mt-1">
                                {data.title}
                            </p>

                            <div className="mt-3 text-sm text-gray-300 space-y-1">

                                <p>{personalInfo.email}</p>

                                <p>{personalInfo.phone}</p>

                                <p>{personalInfo.location}</p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Resume Content */}
                <div className="p-8 space-y-8">

                    {/* Career Objective */}
                    {data.careerGoal && (
                        <section>

                            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-blue-600 pb-2">
                                Career Objective
                            </h2>

                            <p className="mt-3 text-gray-600 leading-7">
                                {data.careerGoal}
                            </p>

                        </section>
                    )}


                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <section>

                            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-blue-600 pb-2">
                                Skills
                            </h2>

                            <div className="flex flex-wrap gap-3 mt-4">

                                {data.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}

                            </div>

                        </section>
                    )}


                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section>

                            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-blue-600 pb-2">
                                Education
                            </h2>

                            <div className="mt-4 space-y-5">

                                {data.education.map((education) => (
                                    <div
                                        key={education._id}
                                        className="border-l-4 border-blue-600 pl-4"
                                    >

                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {education.degree}
                                        </h3>

                                        <p className="text-blue-600 font-medium">
                                            {education.institution}
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {education.startYear} -{" "}
                                            {education.endYear}
                                        </p>

                                    </div>
                                ))}

                            </div>

                        </section>
                    )}


                    {/* Experience */}
                    {data.experience?.some(
                        (item) =>
                            item.company ||
                            item.position ||
                            item.description
                    ) && (
                        <section>

                            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-blue-600 pb-2">
                                Experience
                            </h2>

                            <div className="mt-4 space-y-5">

                                {data.experience.map((experience) => {

                                    if (
                                        !experience.company &&
                                        !experience.position &&
                                        !experience.description
                                    ) {
                                        return null;
                                    }

                                    return (
                                        <div
                                            key={experience._id}
                                            className="border-l-4 border-blue-600 pl-4"
                                        >

                                            <h3 className="text-lg font-semibold">
                                                {experience.position}
                                            </h3>

                                            <p className="text-blue-600">
                                                {experience.company}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {experience.startDate || ""}
                                                {experience.endDate &&
                                                    ` - ${experience.endDate}`}
                                            </p>

                                            {experience.description && (
                                                <p className="text-gray-600 mt-2">
                                                    {experience.description}
                                                </p>
                                            )}

                                        </div>
                                    );
                                })}

                            </div>

                        </section>
                    )}


                    {/* Projects */}
                    {data.projects?.length > 0 && (
                        <section>

                            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-blue-600 pb-2">
                                Projects
                            </h2>

                            <div className="mt-4 space-y-5">

                                {data.projects.map((project) => (
                                    <div
                                        key={project._id}
                                        className="p-5 bg-gray-50 rounded-lg border border-gray-200"
                                    >

                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {project.name}
                                        </h3>

                                        {project.description && (
                                            <p className="text-gray-600 mt-2">
                                                {project.description}
                                            </p>
                                        )}

                                        {/* Technologies */}
                                        {project.technologies?.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">

                                                {project.technologies.map(
                                                    (technology, index) => (
                                                        <span
                                                            key={index}
                                                            className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                                                        >
                                                            {technology}
                                                        </span>
                                                    )
                                                )}

                                            </div>
                                        )}

                                        {/* Links */}
                                        <div className="flex gap-4 mt-4">

                                            {project.projectUrl && (
                                                <a
                                                    href={project.projectUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    Live Project
                                                </a>
                                            )}

                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm text-gray-700 hover:underline"
                                                >
                                                    GitHub
                                                </a>
                                            )}

                                        </div>

                                    </div>
                                ))}

                            </div>

                        </section>
                    )}


                    {/* Certifications */}
                    {data.certifications?.some(
                        (certificate) =>
                            certificate.name ||
                            certificate.organization ||
                            certificate.credentialUrl
                    ) && (
                        <section>

                            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-blue-600 pb-2">
                                Certifications
                            </h2>

                            <div className="mt-4 space-y-4">

                                {data.certifications.map((certificate) => {

                                    if (
                                        !certificate.name &&
                                        !certificate.organization &&
                                        !certificate.credentialUrl
                                    ) {
                                        return null;
                                    }

                                    return (
                                        <div key={certificate._id}>

                                            <h3 className="font-semibold">
                                                {certificate.name}
                                            </h3>

                                            <p className="text-blue-600">
                                                {certificate.organization}
                                            </p>

                                            {certificate.credentialUrl && (
                                                <a
                                                    href={
                                                        certificate.credentialUrl
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    View Certificate
                                                </a>
                                            )}

                                        </div>
                                    );
                                })}

                            </div>

                        </section>
                    )}

                </div>

            </div>

        </div>
    );
};

export default ViewResume;