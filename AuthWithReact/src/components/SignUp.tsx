import React from "react";
import { Link } from "react-router-dom";

interface SignInPromptProps {
  signInPath: string; // Path to the sign-in page
  text:string,
  firstLine:string
}

const SignInPrompt: React.FC<SignInPromptProps> = ({ signInPath,text ,firstLine}) => {
  return (
    <div className="text-center mt-4">
      <span className="text-base-content">{firstLine} </span>
      <Link to={signInPath} className="text-primary hover:underline">
        {text}
      </Link>
    </div>
  );
};

export default SignInPrompt;
