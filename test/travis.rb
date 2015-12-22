#!/usr/bin/env ruby
result = `sass sass/a11y-fr.scss css/a11y-fr.css`
raise result unless $?.to_i == 0
raise "When compiled the module should output some CSS" unless File.exists?('css/a11y-fr.css')
puts "Sass compiled successfully"