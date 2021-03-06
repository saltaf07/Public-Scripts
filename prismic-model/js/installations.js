// @flow
const Installations = {
  Installation: {
    title: {
      type: "StructuredText",
      config: {
        label: "Title",
        single: "heading1",
        useAsTitle: true
      }
    },
    start: {
      type: "Timestamp",
      config: {
        label: "Start date"
      }
    },
    end: {
      type: "Timestamp",
      config: {
        label: "End date"
      }
    },
    place: {
      type: "Link",
      fieldset: "Place",
      config: {
        select: "document",
        customtypes: ["places"],
        label: "Where is it?"
      }
    },
    body: {
      fieldset: "Body content",
      type: "Slices",
      config: {
        labels: {
          text: [{
            name: "featured",
            display: "Featured"
          }],
          editorialImage: [{
            name: "supporting",
            display: "Supporting"
          }, {
            name: "standalone",
            display: "Standalone"
          }],
          quote: [{
            name: "pull",
            display: "Pull"
          }, {
            name: "review",
            display: "Review"
          }]
        },
        choices: {
          text: {
            type: "Slice",
            fieldset: "Text",
            'non-repeat': {
              text: {
                type: "StructuredText",
                config: {
                  multi: "paragraph,hyperlink,strong,em,heading2,heading3,list-item",
                  label: "Text"
                }
              }
            }
          },
          editorialImage: {
            type: "Slice",
            fieldset: "Captioned image",
            'non-repeat': {
              image: {
                type: "Image",
                config: {
                  label: "Image",
                  thumbnails: [{
                    name: "32:15",
                    width: 3200,
                    height: 1500
                  }, {
                    name: "16:9",
                    width: 3200,
                    height: 1800
                  }, {
                    name: "square",
                    width: 3200,
                    height: 3200
                  }]
                }
              },
              caption: {
                type: "StructuredText",
                config: {
                  single: "paragraph,hyperlink,strong,em",
                  label: "Caption"
                }
              }
            }
          },
          editorialImageGallery: {
            type: "Slice",
            fieldset: "Image gallery",
            'non-repeat': {
              title: {
                type: "StructuredText",
                config: {
                  label: "Title",
                  single: "heading1",
                  useAsTitle: true
                }
              }
            },
            repeat: {
              image: {
                type: "Image",
                config: {
                  label: "Image",
                  thumbnails: [{
                    name: "32:15",
                    width: 3200,
                    height: 1500
                  }, {
                    name: "16:9",
                    width: 3200,
                    height: 1800
                  }, {
                    name: "square",
                    width: 3200,
                    height: 3200
                  }]
                }
              },
              caption: {
                type: "StructuredText",
                config: {
                  single: "paragraph,hyperlink,strong,em",
                  label: "Caption"
                }
              }
            }
          },
          gifVideo: {
            type: "Slice",
            fieldset: "Gif video",
            'non-repeat': {
              caption: {
                type: "StructuredText",
                config: {
                  single: "paragraph,hyperlink,strong,em",
                  label: "Caption"
                }
              },
              tasl: {
                type: "Text",
                config: {
                  label: "TASL",
                  placeholder: "title|author|sourceName|sourceLink|license|copyrightHolder|copyrightLink"
                }
              },
              video: {
                type: "Link",
                config: {
                  label: "Video",
                  select: "media",
                  customtypes: [],
                  placeholder: "Video"
                }
              },
              playbackRate: {
                type: "Select",
                config: {
                  label: "Playback rate",
                  options: ["0.1", "0.25", "0.5", "0.75", "1", "1.25", "1.5", "1.75", "2"]
                }
              }
            }
          },
          iframe: {
            type: "Slice",
            fieldset: "Iframe",
            'non-repeat': {
              iframeSrc: {
                type: "Text",
                config: {
                  label: "iframe src",
                  placeholder: "iframe src"
                }
              },
              previewImage: {
                type: "Image",
                config: {
                  label: "Preview image"
                }
              }
            }
          },
          quote: {
            type: "Slice",
            fieldset: "Quote",
            'non-repeat': {
              text: {
                type: "StructuredText",
                config: {
                  multi: "paragraph,hyperlink,strong,em",
                  label: "Quote"
                }
              },
              citation: {
                type: "StructuredText",
                config: {
                  single: "paragraph,hyperlink,strong,em",
                  label: "Citation"
                }
              }
            }
          },
          standfirst: {
            type: "Slice",
            fieldset: "Standfirst",
            'non-repeat': {
              text: {
                type: "StructuredText",
                config: {
                  single: "paragraph,hyperlink,strong,em",
                  label: "Standfirst"
                }
              }
            }
          },
          embed: {
            type: "Slice",
            fieldset: "Embed",
            'non-repeat': {
              embed: {
                type: "Embed",
                config: {
                  label: "Embed (Youtube, Vimeo etc)"
                }
              },
              caption: {
                type: "StructuredText",
                config: {
                  single: "paragraph,hyperlink,strong,em",
                  label: "Caption"
                }
              }
            }
          },
          map: {
            type: "Slice",
            fieldset: "Map",
            'non-repeat': {
              title: {
                type: "StructuredText",
                config: {
                  label: "Title",
                  single: "heading1",
                  useAsTitle: true
                }
              },
              geolocation: {
                type: "GeoPoint",
                config: {
                  label: "Geo point"
                }
              }
            }
          },
          contentList: {
            type: "Slice",
            fieldset: "(??) Content list",
            'non-repeat': {
              title: {
                type: "StructuredText",
                config: {
                  label: "Title",
                  single: "heading1",
                  useAsTitle: true
                }
              }
            },
            repeat: {
              content: {
                type: "Link",
                config: {
                  label: "Content item",
                  select: "document",
                  customtypes: ["pages", "event-series", "books", "events", "articles", "installations"]
                }
              }
            }
          },
          searchResults: {
            type: "Slice",
            fieldset: "(??) Search results",
            'non-repeat': {
              title: {
                type: "StructuredText",
                config: {
                  label: "Title",
                  single: "heading1",
                  useAsTitle: true
                }
              },
              query: {
                type: "Text",
                config: {
                  label: "Query"
                }
              }
            }
          }
        }
      }
    }
  },
  Contributors: {
    contributors: {
      type: "Group",
      fieldset: "Contributors",
      config: {
        fields: {
          role: {
            type: "Link",
            config: {
              label: "Role",
              select: "document",
              customtypes: ["editorial-contributor-roles"]
            }
          },
          contributor: {
            type: "Link",
            config: {
              label: "Contributor",
              select: "document",
              customtypes: ["people", "organisations"]
            }
          },
          description: {
            type: "StructuredText",
            config: {
              multi: "paragraph,hyperlink,strong,em",
              label: "Contributor description override"
            }
          }
        }
      }
    },
    contributorsTitle: {
      type: "StructuredText",
      config: {
        label: "Contributors heading override",
        single: "heading1"
      }
    }
  },
  Promo: {
    promo: {
      type: "Slices",
      config: {
        label: "Promo",
        choices: {
          editorialImage: {
            type: "Slice",
            fieldset: "Editorial image",
            config: {
              label: "Editorial image"
            },
            'non-repeat': {
              caption: {
                type: "StructuredText",
                config: {
                  label: "Promo text",
                  single: "paragraph"
                }
              },
              image: {
                type: "Image",
                config: {
                  label: "Promo image",
                  thumbnails: [{
                    name: "32:15",
                    width: 3200,
                    height: 1500
                  }, {
                    name: "16:9",
                    width: 3200,
                    height: 1800
                  }, {
                    name: "square",
                    width: 3200,
                    height: 3200
                  }]
                }
              },
              link: {
                type: "Text",
                config: {
                  label: "Link override"
                }
              }
            }
          }
        }
      }
    }
  },
  Metadata: {
    metadataDescription: {
      type: "StructuredText",
      config: {
        single: "paragraph,hyperlink,strong,em",
        label: "Metadata description"
      }
    }
  }
}

export default Installations;
