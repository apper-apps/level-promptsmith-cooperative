import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StepIndicator = ({ 
  steps, 
  currentStep, 
  completedSteps = [],
  className 
}) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isComplete = completedSteps.includes(stepNumber);
        const isCurrent = currentStep === stepNumber;
        const isUpcoming = stepNumber > currentStep;
return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                {
                  "bg-gradient-to-br from-green-500 to-green-600 text-white step-complete": isComplete,
                  "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg": isCurrent,
                  "bg-gray-200 text-gray-500": isUpcoming,
                }
              )}
            >
              {isComplete ? (
                <ApperIcon name="Check" size={16} />
              ) : (
                stepNumber
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-2 text-center max-w-[80px] font-medium",
                {
                  "text-green-600": isComplete,
                  "text-primary-600": isCurrent,
                  "text-gray-500": isUpcoming,
                }
              )}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5 mx-4 transition-all duration-300",
                {
                  "bg-gradient-to-r from-green-500 to-green-600": isComplete,
                  "bg-gradient-to-r from-primary-500 to-primary-600": isCurrent && !isComplete,
                  "bg-gray-200": isUpcoming,
                }
              )}
            />
          )}
        </div>
      );
      })}
};

export default StepIndicator;