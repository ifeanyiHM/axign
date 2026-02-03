import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { Check, CheckCircle2, Download, Filter, Search, X } from "lucide-react";
import React, { ReactNode } from "react";
import InputField from "../primitives/form/InputField";
import { Button } from "../ui/button";
import SelectField from "../primitives/form/SelectField";
import { allEmployees } from "@/app/dashboard/ceo/data";

export type ViewMode = "table" | "grid";

export interface FiltersAndActionsProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;

  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;

  showMobileFilters: boolean;
  setShowMobileFilters: React.Dispatch<React.SetStateAction<boolean>>;

  hasActiveFilters: boolean;

  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;

  selectedPriority?: string;
  setSelectedPriority?: React.Dispatch<React.SetStateAction<string>>;

  selectedDepartment?: string;
  setSelectedDepartment?: React.Dispatch<React.SetStateAction<string>>;

  selectedCategory?: string;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<string>>;

  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;

  clearFilters: () => void;

  label?: string;

  children: ReactNode;
}

export default function FiltersandActions({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  showMobileFilters,
  setShowMobileFilters,
  hasActiveFilters,
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
  selectedDepartment,
  setSelectedDepartment,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  clearFilters,
  children,
  label,
}: FiltersAndActionsProps) {
  const { theme } = useTheme();
  const colors = themes[theme];

  // Get unique departments
  const departments = Array.from(
    new Set(allEmployees.map((emp) => emp.department)),
  ).sort();

  return (
    <>
      <div
        className={`${colors.bgCard} rounded-lg p-3 sm:p-4 mb-4 sm:mb-6`}
        style={{ boxShadow: colors.cardShadow }}
      >
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Search and Main Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${colors.textMuted}`}
                size={18}
              />
              <InputField
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 text-sm border-0 ${colors.input}`}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {/* Filter Toggle */}
              <Button
                variant="ghost"
                onClick={() => {
                  setShowFilters(!showFilters);
                  setShowMobileFilters(!showMobileFilters);
                }}
                className={`text-xs sm:text-sm relative ${colors.hover}`}
              >
                <Filter size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Filters</span>
                {hasActiveFilters && (
                  <span className="absolute right-12 -top-0.5 md:-top-1 md:-right-1 sm:static sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs">
                    {
                      [
                        selectedStatus !== "all",
                        selectedPriority !== "all",
                        selectedCategory !== "all",
                      ].filter(Boolean).length
                    }
                  </span>
                )}
              </Button>

              {/* Export */}
              <Button
                variant="ghost"
                className={`text-xs sm:text-sm ${colors.hover}`}
              >
                <Download size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Export</span>
              </Button>

              {/* View Toggle - Desktop Only */}
              <div
                className={`hidden sm:flex gap-1 ${colors.bgCard} p-1 rounded-lg border ${colors.border}`}
              >
                <Button
                  variant="ghost"
                  onClick={() => setViewMode("table")}
                  className={`${colors.hover} px-3 py-1 rounded text-sm`}
                >
                  Table {viewMode === "table" && <Check size={12} />}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setViewMode("grid")}
                  className={`${colors.hover} px-3 py-1 rounded text-sm`}
                >
                  Grid {viewMode === "grid" && <Check size={12} />}
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Dropdowns - Desktop */}
          {showFilters && (
            <div
              className={`hidden sm:grid grid-cols-1 ${selectedPriority ? "md:grid-cols-3" : "md:grid-cols-2"} gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-400`}
            >
              <SelectField
                label="Status"
                containerClassName="sm:gap-2"
                value={selectedStatus}
                selectClassName={`w-full ${colors.text} border-0 px-3 py-2 text-sm ${colors.select}`}
                labelClassName={`${colors.textMuted}`}
                onValueChange={(value) => setSelectedStatus(value)}
                options={
                  label === "not started"
                    ? [
                        { label: "All Statues", value: "all" },
                        { label: "Not Started", value: "Not Started" },
                        { label: "In Progress", value: "In Progress" },
                        { label: "Pending Review", value: "Pending Review" },
                        { label: "Completed", value: "Completed" },
                      ]
                    : [
                        { label: "All Statues", value: "all" },
                        { label: "Active", value: "Active" },
                        { label: "On Leave", value: "On Leave" },
                        { label: "In Active", value: "In Active" },
                      ]
                }
              />

              {selectedPriority && setSelectedPriority && (
                <SelectField
                  label="Priority"
                  containerClassName="sm:gap-2"
                  selectClassName={`w-full border-0 px-3 py-2 text-sm ${colors.select}`}
                  labelClassName={`${colors.textMuted}`}
                  value={selectedPriority}
                  onValueChange={(value) => setSelectedPriority(value)}
                  options={[
                    { label: "All Priorities", value: "all" },
                    { label: "High", value: "High" },
                    { label: "Medium", value: "Medium" },
                    { label: "Low", value: "Low" },
                  ]}
                />
              )}
              {selectedDepartment && setSelectedDepartment && (
                <SelectField
                  label="Department"
                  containerClassName="sm:gap-2"
                  selectClassName={`w-full border-0 px-3 py-2 text-sm ${colors.select}`}
                  labelClassName={`${colors.textMuted}`}
                  value={selectedDepartment}
                  onValueChange={(value) => setSelectedDepartment(value)}
                  options={[
                    { label: "All Department", value: "all" },
                    ...departments.map((dept) => ({
                      label: dept,
                      value: dept,
                    })),
                  ]}
                />
              )}

              {selectedCategory && setSelectedCategory && (
                <SelectField
                  label="Category"
                  containerClassName="sm:gap-2"
                  selectClassName={`w-full border-0 px-3 py-2 text-sm ${colors.select}`}
                  labelClassName={`${colors.textMuted}`}
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value)}
                  options={[
                    { label: "All Categories", value: "all" },
                    { label: "Audit", value: "Audit" },
                    { label: "Documentation", value: "Documentation" },
                    { label: "Training", value: "Training" },
                    { label: "Reporting", value: "Reporting" },
                    { label: "Maintenance", value: "Maintenance" },
                    { label: "Assessment", value: "Assessment" },
                    { label: "HR", value: "HR" },
                  ]}
                />
              )}
            </div>
          )}

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap flex-col md:flex-row md:items-center gap-2 pt-2 sm:pt-3 border-t border-gray-400">
              <span className={`text-xs sm:text-sm ${colors.textMuted}`}>
                Active filters:
              </span>
              {selectedStatus !== "all" && (
                <span
                  className={`flex self-start items-center gap-1.5 px-2 sm:px-3 py-1 ${colors.bgCard} border ${colors.border} rounded-full text-xs sm:text-sm`}
                >
                  Status: {selectedStatus}
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => setSelectedStatus("all")}
                    className={`${colors.hover}`}
                  >
                    <X size={12} className="sm:w-3.5 sm:h-3.5" />
                  </Button>
                </span>
              )}
              {selectedPriority &&
                setSelectedPriority &&
                selectedPriority !== "all" && (
                  <span
                    className={`flex items-center self-start gap-1.5 px-2 sm:px-3 py-1 ${colors.bgCard} border ${colors.border} rounded-full text-xs sm:text-sm`}
                  >
                    Priority: {selectedPriority}
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      onClick={() => setSelectedPriority("all")}
                      className={`${colors.hover}`}
                    >
                      <X size={12} className="sm:w-3.5 sm:h-3.5" />
                    </Button>
                  </span>
                )}
              {selectedDepartment &&
                setSelectedDepartment &&
                selectedDepartment !== "all" && (
                  <span
                    className={`flex items-center self-start gap-1.5 px-2 sm:px-3 py-1 ${colors.bgCard} border ${colors.border} rounded-full text-xs sm:text-sm`}
                  >
                    Department: {selectedDepartment}
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      onClick={() => setSelectedDepartment("all")}
                      className={`${colors.hover}`}
                    >
                      <X size={12} className="sm:w-3.5 sm:h-3.5" />
                    </Button>
                  </span>
                )}
              {selectedCategory &&
                setSelectedCategory &&
                selectedCategory !== "all" && (
                  <span
                    className={`flex items-center self-start gap-1.5 px-2 sm:px-3 py-1 ${colors.bgCard} border ${colors.border} rounded-full text-xs sm:text-sm`}
                  >
                    Category: {selectedCategory}
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      onClick={() => setSelectedCategory("all")}
                      className={`${colors.hover}`}
                    >
                      <X size={12} className="sm:w-3.5 sm:h-3.5" />
                    </Button>
                  </span>
                )}
              <Button
                size="icon-xs"
                className={`${colors.button} mr-auto md:mr-0 md:ml-auto w-auto px-3 rounded py-2 text-xs sm:text-sm`}
                onClick={clearFilters}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 sm:hidden"
            onClick={() => setShowMobileFilters(false)}
          />
          <div
            className={`fixed bottom-0 left-0 right-0 z-50 sm:hidden ${colors.bgCard} rounded-t-2xl p-4 border-t ${colors.border} max-h-[80vh] overflow-y-auto`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button
                size="icon-xs"
                variant="ghost"
                onClick={() => setShowMobileFilters(false)}
              >
                <X size={24} />
              </Button>
            </div>

            <div className="space-y-4">
              <SelectField
                label="Status"
                containerClassName="sm:gap-2"
                value={selectedStatus}
                selectClassName={`w-full border-0 px-3 py-2 text-sm ${colors.select}`}
                onValueChange={(value) => setSelectedStatus(value)}
                options={[
                  { label: "All Statues", value: "all" },
                  { label: "Not Started", value: "Not Started" },
                  { label: "In Progress", value: "In Progress" },
                  { label: "Pending Review", value: "Pending Review" },
                  { label: "Completed", value: "Completed" },
                ]}
              />

              {selectedPriority && setSelectedPriority && (
                <SelectField
                  label="Priority"
                  containerClassName="sm:gap-2"
                  selectClassName={`w-full border-0 px-3 py-2 text-sm ${colors.select}`}
                  value={selectedPriority}
                  onValueChange={(value) => setSelectedPriority(value)}
                  options={[
                    { label: "All Priorities", value: "all" },
                    { label: "High", value: "High" },
                    { label: "Medium", value: "Medium" },
                    { label: "Low", value: "Low" },
                  ]}
                />
              )}

              {selectedDepartment && setSelectedDepartment && (
                <SelectField
                  label="Department"
                  containerClassName="sm:gap-2"
                  selectClassName={`w-full border-0 px-3 py-2 text-sm ${colors.select}`}
                  value={selectedDepartment}
                  onValueChange={(value) => setSelectedDepartment(value)}
                  options={[
                    { label: "All Priorities", value: "all" },
                    { label: "High", value: "High" },
                    { label: "Medium", value: "Medium" },
                    { label: "Low", value: "Low" },
                  ]}
                />
              )}

              {selectedCategory && setSelectedCategory && (
                <SelectField
                  label="Category"
                  containerClassName="sm:gap-2"
                  selectClassName={`w-full border-0 px-3 py-2 text-sm ${colors.select}`}
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value)}
                  options={[
                    { label: "All Categories", value: "all" },
                    { label: "Audit", value: "Audit" },
                    { label: "Documentation", value: "Documentation" },
                    { label: "Training", value: "Training" },
                    { label: "Reporting", value: "Reporting" },
                    { label: "Maintenance", value: "Maintenance" },
                    { label: "Assessment", value: "Assessment" },
                    { label: "HR", value: "HR" },
                  ]}
                />
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  className={`flex-1 px-4 py-2 ${colors.button} rounded-lg`}
                  onClick={() => {
                    clearFilters();
                    setShowMobileFilters(false);
                  }}
                >
                  Clear all
                </Button>
                <Button
                  onClick={() => setShowMobileFilters(false)}
                  className={`flex-1 px-4 py-2 ${colors.button} rounded-lg`}
                >
                  Apply filters
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Results Count */}
      <div className="mb-3 sm:mb-4">
        <p className={`${colors.textMuted} text-sm`}>{children}</p>
      </div>

      {/* View Mode Toggle - Mobile Only */}
      <div className={`sm:hidden flex gap-2 mb-4 p-1 rounded-lg`}>
        <Button
          onClick={() => setViewMode("table")}
          className={`w-full rounded text-sm ${colors.button}`}
        >
          Table {viewMode === "table" && <CheckCircle2 size={18} />}
        </Button>
        <Button
          onClick={() => setViewMode("grid")}
          className={`w-full rounded text-sm ${colors.button}`}
        >
          Grid {viewMode === "grid" && <CheckCircle2 size={18} />}
        </Button>
      </div>
    </>
  );
}
