sed -i '/exec_view/a\
                </span>\
              </button>\
            )}\
            {(isAdmin || isManager) && (\
              <button\
                onClick={() => setCurrentScreen("platform")}\
                className="flex items-center gap-1.5 sm:gap-2 bg-indigo-600 text-white border border-indigo-700 px-2 sm:px-3 py-1.5 rounded-md hover:bg-indigo-700 transition-all font-sans shrink-0 mr-2 shadow-sm"\
              >\
                <Globe className="w-3.5 h-3.5 hidden sm:block" />\
                <span className="text-xs font-bold">\
                  Platform Hub' src/components/DashboardContainer.tsx
