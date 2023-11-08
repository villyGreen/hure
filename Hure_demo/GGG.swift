//
//  GGG.swift
//  Hure_demo
//
//  Created by vadim.vitkovskiy on 08.11.2023.
//

import Foundation
import SVGKit

class GGG {
    static func convert(string: String) {
        let data = string.data(using: .utf8)?.base64EncodedData()
        let receivedIcon: SVGKImage = SVGKImage(data: data)

    }
}
