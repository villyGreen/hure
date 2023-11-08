//
//  ViewController.swift
//  Hure_demo
//
//  Created by vadim.vitkovskiy on 07.11.2023.
//

import UIKit
import JavaScriptCore
import WebKit
import SwiftSoup


class ViewController: UIViewController {


    let context = JSContext()
    var webView: WKWebView!

    // Create a JavaScript context



    override func viewDidLoad() {
        super.viewDidLoad()
        webView = WKWebView()
        view.addSubview(webView)
        webView.navigationDelegate = self
        webView.frame = view.bounds

//        if let url = URL(string:  Bundle.main.path(forResource: "result", ofType: "html")!) {
////            UIApplication.shared.open(url, options: [:], completionHandler: nil)
//
//            let request = URLRequest(url: url)
//            webView.load(request)
//        }

//        webView./*bac*/

        if let htmlFilePath = Bundle.main.path(forResource: "result", ofType: "html") {
                    do {
                        let htmlString = try String(contentsOfFile: htmlFilePath)
                        webView.loadHTMLString(htmlString, baseURL: Bundle.main.bundleURL)

                        webView.isInspectable = true
                        if let htmlFilePath = Bundle.main.path(forResource: "result", ofType: "html") {
                            do {
                                let htmlString = try String(contentsOfFile: htmlFilePath)

                                // Parse the HTML using SwiftSoup
                                let doc: Document = try SwiftSoup.parse(htmlString)

                                // Get the SVG element
                                if let svgElement = try doc.select("svg").first() {
                                    // Extract the SVG as a string
                                    let svgString = try svgElement.outerHtml().replacingOccurrences(of: "\"", with: "\'").replacingOccurrences(of: "\n", with: "").replacingOccurrences(of: "Z\\", with: "").replacingOccurrences(of: "\\", with: "")

//                                    GGG.convert(string: svgString)

                                    let str = svgString
                                    let updatedStr = str.replacingOccurrences(of: "\\", with: "")

                                    print(updatedStr)

                                    // Print the SVG string
//                                    print(svgString)
                                } else {
                                    print("SVG element not found in the HTML")
                                }
                            } catch {
                                print("Error loading or parsing HTML file: \(error)")
                            }
                        } else {
                            print("HTML file not found")
                        }

                    } catch {
                        print("Error loading HTML file: \(error)")
                    }
                } else {
                    print("HTML file not found")
                }

        // Do any additional setup after loading the view.
    }

    @IBAction func requestAction(_ sender: Any) {


        if let jsFilePath = Bundle.main.path(forResource: "main", ofType: "js") {
            do {
                let jsString = try String(contentsOfFile: jsFilePath)
                // Evaluate the contents of the JavaScript file
                let gg = context?.evaluateScript(jsString)
                print(gg)
            } catch {
                print("Error loading JavaScript file: \(error)")
            }
        } else {
            print("JavaScript file not found")
        }

    }
    
}

extension ViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {

    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        
    }
    
}
