import { Card, Avatar, Button, Upload, Input } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

const AccountSettings = () => {
    const [profileImage, setProfileImage] = useState("/images/default-profile.jpg"); // Default profile image
    const [username, setUsername] = useState("Nigel Bula");
    const [email, setEmail] = useState("nigxdfdula@gmail.com");
    const [newPassword, setNewPassword] = useState("");

    const handleImageChange = (info) => {
        if (info.file.status === "done") {
            setProfileImage(URL.createObjectURL(info.file.originFileObj));
        }
    };

    return (
        <div className=" space-y-2 bg-white dark:bg-gray-900">
            {/* Profile Image Update */}

          <div>


            <Card title="Update Profile Image" className="shadow-none dark:text-white mb-20">
                <p className="text-sm ">
                    Your profile picture isn’t public, only team members can view it.
                </p>
                <div className="flex items-center gap-4 mt-4 bg-white dark:bg-gray-900">
                    <Avatar size={80} src={profileImage} icon={<UserOutlined />} />
                    <Upload showUploadList={false} beforeUpload={() => false} onChange={handleImageChange}>
                        <Button icon={<UploadOutlined />}>Change Photo</Button>
                    </Upload>
                </div>
            </Card>
            </div>


            <div>

            {/* Personal Details */}
            <Card title="Personal Details" className="mb-20">
                <p className="text-sm text-gray-500">
                    Your details aren’t public, only team members can view them.
                </p>
                <div className="mt-4 space-y-4 w-[40%]">
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        addonBefore="Username"
                    />
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        addonBefore="Email"
                    />
                     <Button type="primary" className="mt-4 custom-color-btn">Save Details</Button>
                </div>
            </Card>
            </div>

            <div>

            {/* Update Password */}
            <Card title="Update Password" className="mb-20" >
                <p className="text-sm text-gray-500">
                    Choose a strong password to keep your account secure.
                </p>
                <div className="mt-4 w-[40%]">
                    <Input.Password
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className="mb-5"
                    />
                     <Input.Password
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Confirm New Password"
                    />
                    <Button type="primary" className="mt-4 custom-color-btn">Save Password</Button>
                </div>
            </Card>
            </div>

        </div>
    );
};

export default AccountSettings;
